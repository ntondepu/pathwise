import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { pool } from '../config/database';
import { logger } from '../utils/logger';

const router = Router();

// Get user data for authenticated routes
router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user!.uid;
    const client = await pool.connect();
    
    const result = await client.query(
      'SELECT * FROM users WHERE firebase_uid = $1',
      [firebaseUid]
    );

    if (result.rows.length === 0) {
      client.release();
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const user = result.rows[0];
    client.release();

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        school: user.school,
        major: user.major,
        graduationYear: user.graduation_year,
        createdAt: user.created_at,
      }
    });
  } catch (error) {
    logger.error('Error fetching user data:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
