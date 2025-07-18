import { Router, Request, Response } from 'express';
import { pool } from '../config/database';
import { authenticate } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// Register or update user
router.post('/register', authenticate, async (req: Request, res: Response) => {
  try {
    const { email, displayName, school, major, graduationYear } = req.body;
    const firebaseUid = req.user!.uid;

    const client = await pool.connect();
    
    // Check if user already exists
    const existingUser = await client.query(
      'SELECT * FROM users WHERE firebase_uid = $1',
      [firebaseUid]
    );

    let user;
    if (existingUser.rows.length > 0) {
      // Update existing user
      const result = await client.query(
        `UPDATE users 
         SET email = $2, display_name = $3, school = $4, major = $5, graduation_year = $6, updated_at = CURRENT_TIMESTAMP
         WHERE firebase_uid = $1 
         RETURNING *`,
        [firebaseUid, email, displayName, school, major, graduationYear]
      );
      user = result.rows[0];
    } else {
      // Create new user
      const result = await client.query(
        `INSERT INTO users (firebase_uid, email, display_name, school, major, graduation_year)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [firebaseUid, email, displayName, school, major, graduationYear]
      );
      user = result.rows[0];
    }

    client.release();

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        school: user.school,
        major: user.major,
        graduationYear: user.graduation_year,
      }
    });
  } catch (error) {
    logger.error('Error in user registration:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get current user profile
router.get('/profile', authenticate, async (req: Request, res: Response) => {
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
    logger.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req: Request, res: Response) => {
  try {
    const { displayName, school, major, graduationYear } = req.body;
    const firebaseUid = req.user!.uid;

    const client = await pool.connect();
    
    const result = await client.query(
      `UPDATE users 
       SET display_name = $2, school = $3, major = $4, graduation_year = $5, updated_at = CURRENT_TIMESTAMP
       WHERE firebase_uid = $1 
       RETURNING *`,
      [firebaseUid, displayName, school, major, graduationYear]
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
      }
    });
  } catch (error) {
    logger.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
