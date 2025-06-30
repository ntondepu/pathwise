import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { pool } from '../config/database';
import { logger } from '../utils/logger';

const router = Router();

// Get all courses with optional filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { school, department, search, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = `
      SELECT c.*, d.name as department_name, s.name as school_name
      FROM courses c
      LEFT JOIN departments d ON c.department_id = d.id
      LEFT JOIN schools s ON c.school_id = s.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (school) {
      query += ` AND s.name ILIKE $${paramIndex}`;
      params.push(`%${school}%`);
      paramIndex++;
    }

    if (department) {
      query += ` AND d.name ILIKE $${paramIndex}`;
      params.push(`%${department}%`);
      paramIndex++;
    }

    if (search) {
      query += ` AND (c.code ILIKE $${paramIndex} OR c.title ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ` ORDER BY c.code LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(Number(limit), offset);

    const client = await pool.connect();
    const result = await client.query(query, params);
    
    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) FROM courses c
      LEFT JOIN departments d ON c.department_id = d.id
      LEFT JOIN schools s ON c.school_id = s.id
      WHERE 1=1
    `;
    const countParams: any[] = [];
    let countParamIndex = 1;

    if (school) {
      countQuery += ` AND s.name ILIKE $${countParamIndex}`;
      countParams.push(`%${school}%`);
      countParamIndex++;
    }

    if (department) {
      countQuery += ` AND d.name ILIKE $${countParamIndex}`;
      countParams.push(`%${department}%`);
      countParamIndex++;
    }

    if (search) {
      countQuery += ` AND (c.code ILIKE $${countParamIndex} OR c.title ILIKE $${countParamIndex})`;
      countParams.push(`%${search}%`);
    }

    const countResult = await client.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    client.release();

    res.json({
      success: true,
      data: {
        courses: result.rows,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    logger.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get course by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    
    const result = await client.query(
      `SELECT c.*, d.name as department_name, s.name as school_name
       FROM courses c
       LEFT JOIN departments d ON c.department_id = d.id
       LEFT JOIN schools s ON c.school_id = s.id
       WHERE c.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      client.release();
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    // Get prerequisites
    const prereqResult = await client.query(
      `SELECT c.* FROM courses c
       INNER JOIN course_prerequisites cp ON c.id = cp.prerequisite_id
       WHERE cp.course_id = $1`,
      [id]
    );

    client.release();

    const course = result.rows[0];
    course.prerequisites = prereqResult.rows;

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    logger.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
