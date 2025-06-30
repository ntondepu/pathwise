"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const database_1 = require("../config/database");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
// Get user data for authenticated routes
router.get('/me', auth_1.authenticate, async (req, res) => {
    try {
        const firebaseUid = req.user.uid;
        const client = await database_1.pool.connect();
        const result = await client.query('SELECT * FROM users WHERE firebase_uid = $1', [firebaseUid]);
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
    }
    catch (error) {
        logger_1.logger.error('Error fetching user data:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map