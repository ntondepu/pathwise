import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { pool } from '../config/database';
import { logger } from '../utils/logger';
import { professorService } from '../services/professor';

const router = Router();

// Get all professors with optional filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { 
      university = 'Purdue University', 
      department, 
      search, 
      page = 1, 
      limit = 20 
    } = req.query;
    
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 20;
    const offset = (pageNum - 1) * limitNum;

    const client = await pool.connect();
    
    try {
      let whereClause = 'WHERE 1=1';
      const params: any[] = [];
      let paramCount = 0;

      if (university) {
        paramCount++;
        whereClause += ` AND university ILIKE $${paramCount}`;
        params.push(`%${university}%`);
      }

      if (department) {
        paramCount++;
        whereClause += ` AND department ILIKE $${paramCount}`;
        params.push(`%${department}%`);
      }

      if (search) {
        paramCount++;
        whereClause += ` AND name ILIKE $${paramCount}`;
        params.push(`%${search}%`);
      }

      // Get professors from local database
      const result = await client.query(
        `SELECT 
          id, name, department, university, email, rating, 
          total_reviews, rmp_id, created_at, updated_at
        FROM professors 
        ${whereClause}
        ORDER BY rating DESC NULLS LAST, total_reviews DESC
        LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`,
        [...params, limitNum, offset]
      );

      // Get total count
      const countResult = await client.query(
        `SELECT COUNT(*) FROM professors ${whereClause}`,
        params
      );

      const professors = result.rows;
      const total = parseInt(countResult.rows[0].count);

      // If we have a search term and few results, try to fetch from RMP
      if (search && professors.length < 5) {
        try {
          const rmpResults = await professorService.searchProfessors(
            search as string, 
            university as string
          );
          
          // Add external results that aren't already in our DB
          rmpResults.professors.forEach(rmpProf => {
            const exists = professors.find(p => 
              p.name.toLowerCase().includes(rmpProf.name.toLowerCase()) ||
              p.rmp_id === rmpProf.id
            );
            
            if (!exists) {
              professors.push({
                id: `external-${rmpProf.id}`,
                name: rmpProf.name,
                department: rmpProf.department,
                university: rmpProf.school,
                email: null,
                rating: rmpProf.rating,
                total_reviews: rmpProf.numRatings,
                rmp_id: rmpProf.id,
                created_at: null,
                updated_at: null,
                external: true
              });
            }
          });
        } catch (error) {
          logger.warn('Failed to fetch from RMP:', error);
        }
      }

      res.json({
        professors: professors.slice(0, limitNum),
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      });
    } finally {
      client.release();
    }
  } catch (error) {
    logger.error('Error fetching professors:', error);
    res.status(500).json({ error: 'Failed to fetch professors' });
  }
});

// Get professor by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Check if this is an external ID
    if (id.startsWith('external-')) {
      const rmpId = id.replace('external-', '');
      const professorData = await professorService.getProfessorById(rmpId);
      
      if (!professorData) {
        return res.status(404).json({ error: 'Professor not found' });
      }
      
      return res.json({
        id: `external-${professorData.id}`,
        name: professorData.name,
        department: professorData.department,
        university: professorData.school,
        rating: professorData.rating,
        total_reviews: professorData.numRatings,
        rmp_id: professorData.id,
        external: true
      });
    }
    
    // Get from local database
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT 
          id, name, department, university, email, rating, 
          total_reviews, rmp_id, created_at, updated_at
        FROM professors WHERE id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Professor not found' });
      }

      res.json(result.rows[0]);
    } finally {
      client.release();
    }
  } catch (error) {
    logger.error('Error fetching professor:', error);
    res.status(500).json({ error: 'Failed to fetch professor' });
  }
});

// Search professors by name and school
router.get('/search/:name', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const { university = 'Purdue University' } = req.query;
    
    // Search both local database and external sources
    const [localResults, externalResults] = await Promise.allSettled([
      // Local database search
      (async () => {
        const client = await pool.connect();
        try {
          const result = await client.query(
            `SELECT 
              id, name, department, university, email, rating, 
              total_reviews, rmp_id, created_at, updated_at
            FROM professors 
            WHERE name ILIKE $1 AND university ILIKE $2
            ORDER BY rating DESC NULLS LAST`,
            [`%${name}%`, `%${university}%`]
          );
          return result.rows;
        } finally {
          client.release();
        }
      })(),
      // External search
      professorService.searchProfessors(name, university as string)
    ]);
    
    const professors: any[] = [];
    
    // Add local results
    if (localResults.status === 'fulfilled') {
      professors.push(...localResults.value);
    }
    
    // Add external results that aren't duplicates
    if (externalResults.status === 'fulfilled') {
      externalResults.value.professors.forEach(extProf => {
        const exists = professors.find(p => 
          p.name.toLowerCase().includes(extProf.name.toLowerCase()) ||
          p.rmp_id === extProf.id
        );
        
        if (!exists) {
          professors.push({
            id: `external-${extProf.id}`,
            name: extProf.name,
            department: extProf.department,
            university: extProf.school,
            rating: extProf.rating,
            total_reviews: extProf.numRatings,
            rmp_id: extProf.id,
            external: true
          });
        }
      });
    }
    
    res.json({
      professors,
      total: professors.length
    });
  } catch (error) {
    logger.error('Error searching professors:', error);
    res.status(500).json({ error: 'Failed to search professors' });
  }
});

export default router;
