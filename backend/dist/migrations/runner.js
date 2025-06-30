"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrations = runMigrations;
exports.resetDatabase = resetDatabase;
const pg_1 = require("pg");
const fs_1 = require("fs");
const path_1 = require("path");
const logger_1 = require("../utils/logger");
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/coursepath_ai';
const pool = new pg_1.Pool({
    connectionString,
});
async function runMigrations() {
    const client = await pool.connect();
    try {
        logger_1.logger.info('Starting database migrations...');
        // Run initial schema migration
        const schemaSQL = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '001_initial_schema.sql'), 'utf8');
        await client.query(schemaSQL);
        logger_1.logger.info('✓ Initial schema migration completed');
        // Run seed data migration (only in development)
        if (process.env.NODE_ENV !== 'production') {
            const seedSQL = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '002_seed_data.sql'), 'utf8');
            await client.query(seedSQL);
            logger_1.logger.info('✓ Seed data migration completed');
        }
        logger_1.logger.info('All migrations completed successfully!');
    }
    catch (error) {
        logger_1.logger.error('Migration failed:', error);
        throw error;
    }
    finally {
        client.release();
    }
}
async function resetDatabase() {
    const client = await pool.connect();
    try {
        logger_1.logger.info('Resetting database...');
        // Drop all tables in correct order to handle foreign key constraints
        await client.query(`
      DROP TABLE IF EXISTS ai_messages CASCADE;
      DROP TABLE IF EXISTS ai_conversations CASCADE;
      DROP TABLE IF EXISTS bookmarks CASCADE;
      DROP TABLE IF EXISTS job_skills CASCADE;
      DROP TABLE IF EXISTS jobs CASCADE;
      DROP TABLE IF EXISTS path_courses CASCADE;
      DROP TABLE IF EXISTS academic_paths CASCADE;
      DROP TABLE IF EXISTS course_professors CASCADE;
      DROP TABLE IF EXISTS course_reviews CASCADE;
      DROP TABLE IF EXISTS courses CASCADE;
      DROP TABLE IF EXISTS professors CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
    `);
        logger_1.logger.info('✓ Database reset completed');
        // Re-run migrations
        await runMigrations();
    }
    catch (error) {
        logger_1.logger.error('Database reset failed:', error);
        throw error;
    }
    finally {
        client.release();
    }
}
// CLI runner
if (require.main === module) {
    const command = process.argv[2];
    if (command === 'reset') {
        resetDatabase()
            .then(() => {
            console.log('Database reset and migrations completed!');
            process.exit(0);
        })
            .catch((error) => {
            console.error('Failed:', error.message);
            process.exit(1);
        });
    }
    else {
        runMigrations()
            .then(() => {
            console.log('Migrations completed!');
            process.exit(0);
        })
            .catch((error) => {
            console.error('Failed:', error.message);
            process.exit(1);
        });
    }
}
//# sourceMappingURL=runner.js.map