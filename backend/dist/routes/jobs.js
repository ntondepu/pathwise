"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const database_1 = require("../config/database");
const logger_1 = require("../utils/logger");
const jobBoard_1 = require("../services/jobBoard");
const router = (0, express_1.Router)();
// Search jobs from external APIs and database
router.get('/search', auth_1.optionalAuth, async (req, res) => {
    try {
        const { query = 'software developer', location = 'us', type = '', remote = false, page = 1, limit = 20 } = req.query;
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 20;
        // Search jobs from external APIs
        const jobsResult = await jobBoard_1.jobBoardService.searchAllJobs(query, location, limitNum);
        // Also search our local database for saved jobs
        const client = await database_1.pool.connect();
        let localJobs = [];
        try {
            let whereClause = 'WHERE 1=1';
            const params = [];
            let paramCount = 0;
            if (query) {
                paramCount++;
                whereClause += ` AND (title ILIKE $${paramCount} OR company ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
                params.push(`%${query}%`);
            }
            if (location && location !== 'us') {
                paramCount++;
                whereClause += ` AND location ILIKE $${paramCount}`;
                params.push(`%${location}%`);
            }
            if (type) {
                paramCount++;
                whereClause += ` AND employment_type = $${paramCount}`;
                params.push(type);
            }
            if (remote === 'true') {
                whereClause += ' AND remote_friendly = true';
            }
            const result = await client.query(`SELECT 
          id, title, company, location, description, requirements, 
          salary_min, salary_max, employment_type, experience_level,
          remote_friendly, application_url, posted_date, source
        FROM jobs 
        ${whereClause}
        ORDER BY posted_date DESC 
        LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`, [...params, limitNum, (pageNum - 1) * limitNum]);
            localJobs = result.rows;
        }
        finally {
            client.release();
        }
        // Combine and deduplicate jobs
        const allJobs = [...jobsResult.jobs, ...localJobs];
        const uniqueJobs = allJobs.filter((job, index, self) => index === self.findIndex(j => j.external_id === job.external_id && j.source === job.source));
        // Sort by relevance/date
        uniqueJobs.sort((a, b) => new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime());
        res.json({
            jobs: uniqueJobs.slice(0, limitNum),
            pagination: {
                page: pageNum,
                limit: limitNum,
                total: jobsResult.total + localJobs.length,
                totalPages: Math.ceil((jobsResult.total + localJobs.length) / limitNum)
            }
        });
    }
    catch (error) {
        logger_1.logger.error('Error searching jobs:', error);
        res.status(500).json({ error: 'Failed to search jobs' });
    }
});
// Get job by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Try to find job in local database first
        const client = await database_1.pool.connect();
        let job = null;
        try {
            const result = await client.query(`SELECT 
          id, title, company, location, description, requirements, 
          salary_min, salary_max, employment_type, experience_level,
          remote_friendly, application_url, posted_date, source
        FROM jobs WHERE id = $1`, [id]);
            if (result.rows.length > 0) {
                job = result.rows[0];
            }
        }
        finally {
            client.release();
        }
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.json(job);
    }
    catch (error) {
        logger_1.logger.error('Error fetching job:', error);
        res.status(500).json({ error: 'Failed to fetch job' });
    }
});
// Get skills match for a job (authenticated users only)
router.get('/:id/skills-match', auth_1.authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const firebaseUid = req.user.uid;
        // Get user's profile and completed courses
        const client = await database_1.pool.connect();
        try {
            const userResult = await client.query('SELECT * FROM users WHERE firebase_uid = $1', [firebaseUid]);
            if (userResult.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Get job details
            const jobResult = await client.query('SELECT * FROM jobs WHERE id = $1', [id]);
            if (jobResult.rows.length === 0) {
                return res.status(404).json({ error: 'Job not found' });
            }
            // Get job skills
            const skillsResult = await client.query('SELECT skill, is_required FROM job_skills WHERE job_id = $1', [id]);
            const jobSkills = skillsResult.rows.map(row => ({
                skill: row.skill,
                required: row.is_required
            }));
            // Get user's completed courses and derive skills
            const coursesResult = await client.query(`SELECT c.* FROM courses c
         INNER JOIN path_courses pc ON c.id = pc.course_id
         INNER JOIN academic_paths ap ON pc.path_id = ap.id
         WHERE ap.user_id = $1 AND pc.status = 'completed'`, [userResult.rows[0].id]);
            // Simple skill extraction from course names/descriptions
            // In a real app, you'd have a more sophisticated mapping
            const userSkills = new Set();
            coursesResult.rows.forEach(course => {
                if (course.code.includes('CS')) {
                    userSkills.add('Programming');
                    if (course.name.includes('Java'))
                        userSkills.add('Java');
                    if (course.name.includes('Python'))
                        userSkills.add('Python');
                    if (course.name.includes('Algorithm'))
                        userSkills.add('Algorithms');
                    if (course.name.includes('Data Structure'))
                        userSkills.add('Data Structures');
                }
            });
            const matchedSkills = jobSkills.filter(jobSkill => Array.from(userSkills).some(userSkill => userSkill.toLowerCase().includes(jobSkill.skill.toLowerCase()) ||
                jobSkill.skill.toLowerCase().includes(userSkill.toLowerCase())));
            const missingSkills = jobSkills.filter(jobSkill => !matchedSkills.some(matched => matched.skill === jobSkill.skill));
            const matchPercentage = jobSkills.length > 0
                ? Math.round((matchedSkills.length / jobSkills.length) * 100)
                : 0;
            res.json({
                matchPercentage,
                matchedSkills: matchedSkills.map(s => s.skill),
                missingSkills: missingSkills.map(s => ({ skill: s.skill, required: s.required })),
                recommendations: missingSkills.length > 0 ? [
                    'Consider taking relevant courses to build missing skills',
                    'Look for projects or internships to gain practical experience'
                ] : []
            });
        }
        finally {
            client.release();
        }
    }
    catch (error) {
        logger_1.logger.error('Error calculating skills match:', error);
        res.status(500).json({ error: 'Failed to calculate skills match' });
    }
});
exports.default = router;
//# sourceMappingURL=jobs.js.map