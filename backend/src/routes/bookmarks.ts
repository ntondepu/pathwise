import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { pool } from '../config/database';
import { logger } from '../utils/logger';

const router = Router();

// Get all bookmarks for user
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user!.uid;
    const client = await pool.connect();
    
    const userResult = await client.query(
      'SELECT id FROM users WHERE firebase_uid = $1',
      [firebaseUid]
    );

    if (userResult.rows.length === 0) {
      client.release();
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const result = await client.query(
      `SELECT * FROM bookmarks 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userResult.rows[0].id]
    );

    client.release();

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    logger.error('Error fetching bookmarks:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Add bookmark
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { type, itemId, notes } = req.body;
    const firebaseUid = req.user!.uid;

    const client = await pool.connect();
    
    const userResult = await client.query(
      'SELECT id FROM users WHERE firebase_uid = $1',
      [firebaseUid]
    );

    if (userResult.rows.length === 0) {
      client.release();
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const result = await client.query(
      `INSERT INTO bookmarks (user_id, item_type, item_id, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userResult.rows[0].id, type, itemId, notes]
    );

    client.release();

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    logger.error('Error adding bookmark:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Remove bookmark
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const firebaseUid = req.user!.uid;

    const client = await pool.connect();
    
    const userResult = await client.query(
      'SELECT id FROM users WHERE firebase_uid = $1',
      [firebaseUid]
    );

    if (userResult.rows.length === 0) {
      client.release();
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const result = await client.query(
      'DELETE FROM bookmarks WHERE id = $1 AND user_id = $2',
      [id, userResult.rows[0].id]
    );

    client.release();

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Bookmark not found'
      });
    }

    res.json({
      success: true,
      message: 'Bookmark removed'
    });
  } catch (error) {
    logger.error('Error removing bookmark:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
