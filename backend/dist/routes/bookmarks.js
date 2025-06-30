"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const database_1 = require("../config/database");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
// Get all bookmarks for user
router.get('/', auth_1.authenticate, async (req, res) => {
    try {
        const firebaseUid = req.user.uid;
        const client = await database_1.pool.connect();
        const userResult = await client.query('SELECT id FROM users WHERE firebase_uid = $1', [firebaseUid]);
        if (userResult.rows.length === 0) {
            client.release();
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        const result = await client.query(`SELECT * FROM bookmarks 
       WHERE user_id = $1 
       ORDER BY created_at DESC`, [userResult.rows[0].id]);
        client.release();
        res.json({
            success: true,
            data: result.rows
        });
    }
    catch (error) {
        logger_1.logger.error('Error fetching bookmarks:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
// Add bookmark
router.post('/', auth_1.authenticate, async (req, res) => {
    try {
        const { type, itemId, notes } = req.body;
        const firebaseUid = req.user.uid;
        const client = await database_1.pool.connect();
        const userResult = await client.query('SELECT id FROM users WHERE firebase_uid = $1', [firebaseUid]);
        if (userResult.rows.length === 0) {
            client.release();
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        const result = await client.query(`INSERT INTO bookmarks (user_id, item_type, item_id, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING *`, [userResult.rows[0].id, type, itemId, notes]);
        client.release();
        res.json({
            success: true,
            data: result.rows[0]
        });
    }
    catch (error) {
        logger_1.logger.error('Error adding bookmark:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
// Remove bookmark
router.delete('/:id', auth_1.authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const firebaseUid = req.user.uid;
        const client = await database_1.pool.connect();
        const userResult = await client.query('SELECT id FROM users WHERE firebase_uid = $1', [firebaseUid]);
        if (userResult.rows.length === 0) {
            client.release();
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        const result = await client.query('DELETE FROM bookmarks WHERE id = $1 AND user_id = $2', [id, userResult.rows[0].id]);
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
    }
    catch (error) {
        logger_1.logger.error('Error removing bookmark:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=bookmarks.js.map