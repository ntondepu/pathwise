"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const database_1 = require("../config/database");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
// Get user's academic path
router.get('/', auth_1.authenticate, async (req, res) => {
    try {
        const firebaseUid = req.user.uid;
        const client = await database_1.pool.connect();
        // Get user
        const userResult = await client.query('SELECT * FROM users WHERE firebase_uid = $1', [firebaseUid]);
        if (userResult.rows.length === 0) {
            client.release();
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        const userId = userResult.rows[0].id;
        // Get academic path
        const pathResult = await client.query('SELECT * FROM academic_paths WHERE user_id = $1', [userId]);
        if (pathResult.rows.length === 0) {
            client.release();
            return res.json({
                success: true,
                data: null
            });
        }
        // Get user courses
        const coursesResult = await client.query(`SELECT uc.*, c.code, c.title, c.credits
       FROM user_courses uc
       INNER JOIN courses c ON uc.course_id = c.id
       WHERE uc.user_id = $1
       ORDER BY uc.semester, c.code`, [userId]);
        client.release();
        const path = pathResult.rows[0];
        path.courses = coursesResult.rows;
        res.json({
            success: true,
            data: path
        });
    }
    catch (error) {
        logger_1.logger.error('Error fetching academic path:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
// Create or update academic path
router.post('/', auth_1.authenticate, async (req, res) => {
    try {
        const { major, school, graduationYear } = req.body;
        const firebaseUid = req.user.uid;
        const client = await database_1.pool.connect();
        // Get user
        const userResult = await client.query('SELECT * FROM users WHERE firebase_uid = $1', [firebaseUid]);
        if (userResult.rows.length === 0) {
            client.release();
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        const userId = userResult.rows[0].id;
        // Check if path already exists
        const existingPath = await client.query('SELECT * FROM academic_paths WHERE user_id = $1', [userId]);
        let result;
        if (existingPath.rows.length > 0) {
            // Update existing path
            result = await client.query(`UPDATE academic_paths 
         SET major = $2, school = $3, graduation_year = $4, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $1 
         RETURNING *`, [userId, major, school, graduationYear]);
        }
        else {
            // Create new path
            result = await client.query(`INSERT INTO academic_paths (user_id, major, school, graduation_year)
         VALUES ($1, $2, $3, $4)
         RETURNING *`, [userId, major, school, graduationYear]);
        }
        client.release();
        res.json({
            success: true,
            data: result.rows[0]
        });
    }
    catch (error) {
        logger_1.logger.error('Error creating/updating academic path:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
// Add course to academic path
router.post('/courses', auth_1.authenticate, async (req, res) => {
    try {
        const { courseId, semester, status = 'planned' } = req.body;
        const firebaseUid = req.user.uid;
        const client = await database_1.pool.connect();
        // Get user
        const userResult = await client.query('SELECT * FROM users WHERE firebase_uid = $1', [firebaseUid]);
        if (userResult.rows.length === 0) {
            client.release();
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        const userId = userResult.rows[0].id;
        // Get course credits
        const courseResult = await client.query('SELECT credits FROM courses WHERE id = $1', [courseId]);
        if (courseResult.rows.length === 0) {
            client.release();
            return res.status(404).json({
                success: false,
                error: 'Course not found'
            });
        }
        const credits = courseResult.rows[0].credits;
        // Add course to user's plan
        await client.query(`INSERT INTO user_courses (user_id, course_id, semester, status, credits)
       VALUES ($1, $2, $3, $4, $5)`, [userId, courseId, semester, status, credits]);
        client.release();
        res.json({
            success: true,
            message: 'Course added to academic path'
        });
    }
    catch (error) {
        logger_1.logger.error('Error adding course to path:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
// Update course in academic path
router.put('/courses/:courseId', auth_1.authenticate, async (req, res) => {
    try {
        const { courseId } = req.params;
        const { status, grade, semester } = req.body;
        const firebaseUid = req.user.uid;
        const client = await database_1.pool.connect();
        // Get user
        const userResult = await client.query('SELECT * FROM users WHERE firebase_uid = $1', [firebaseUid]);
        if (userResult.rows.length === 0) {
            client.release();
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        const userId = userResult.rows[0].id;
        // Update user course
        const result = await client.query(`UPDATE user_courses 
       SET status = COALESCE($3, status), 
           grade = COALESCE($4, grade), 
           semester = COALESCE($5, semester),
           updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $1 AND course_id = $2
       RETURNING *`, [userId, courseId, status, grade, semester]);
        if (result.rows.length === 0) {
            client.release();
            return res.status(404).json({
                success: false,
                error: 'Course not found in academic path'
            });
        }
        client.release();
        res.json({
            success: true,
            data: result.rows[0]
        });
    }
    catch (error) {
        logger_1.logger.error('Error updating course in path:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=paths.js.map