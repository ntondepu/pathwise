"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.testConnection = exports.pool = void 0;
const pg_1 = require("pg");
const logger_1 = require("../utils/logger");
// Database connection configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.POSTGRES_DB || 'coursepath_ai',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection cannot be established
};
// Create connection pool
exports.pool = new pg_1.Pool(dbConfig);
// Handle pool errors
exports.pool.on('error', (err) => {
    logger_1.logger.error('Unexpected error on idle client', err);
    process.exit(-1);
});
// Test database connection
const testConnection = async () => {
    try {
        const client = await exports.pool.connect();
        await client.query('SELECT NOW()');
        client.release();
        logger_1.logger.info('✅ Database connection successful');
        return true;
    }
    catch (error) {
        logger_1.logger.error('❌ Database connection failed:', error);
        return false;
    }
};
exports.testConnection = testConnection;
// Initialize database tables
const initializeDatabase = async () => {
    try {
        const client = await exports.pool.connect();
        // Enable UUID extension
        await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        // Users table
        await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        firebase_uid VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        display_name VARCHAR(255),
        school VARCHAR(255),
        major VARCHAR(255),
        graduation_year INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Schools table
        await client.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        abbreviation VARCHAR(10),
        location VARCHAR(255),
        type VARCHAR(50), -- public, private, community
        website VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Departments table
        await client.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        abbreviation VARCHAR(10),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Courses table
        await client.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
        department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
        code VARCHAR(20) NOT NULL, -- CS 180, MATH 261
        title VARCHAR(255) NOT NULL,
        description TEXT,
        credits INTEGER NOT NULL DEFAULT 3,
        difficulty VARCHAR(20) CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
        tags TEXT[], -- Array of tags
        average_gpa DECIMAL(3,2),
        average_workload INTEGER, -- Hours per week
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(school_id, code)
      )
    `);
        // Course prerequisites table (many-to-many)
        await client.query(`
      CREATE TABLE IF NOT EXISTS course_prerequisites (
        course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
        prerequisite_id UUID REFERENCES courses(id) ON DELETE CASCADE,
        PRIMARY KEY (course_id, prerequisite_id)
      )
    `);
        // Professors table
        await client.query(`
      CREATE TABLE IF NOT EXISTS professors (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
        department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        rating DECIMAL(2,1) CHECK (rating >= 1 AND rating <= 5),
        difficulty DECIMAL(2,1) CHECK (difficulty >= 1 AND difficulty <= 5),
        would_take_again INTEGER CHECK (would_take_again >= 0 AND would_take_again <= 100),
        tags TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Course offerings table
        await client.query(`
      CREATE TABLE IF NOT EXISTS course_offerings (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
        professor_id UUID REFERENCES professors(id) ON DELETE CASCADE,
        semester VARCHAR(20) NOT NULL, -- Fall 2024, Spring 2025
        section VARCHAR(10),
        days TEXT[], -- Array of days
        start_time TIME,
        end_time TIME,
        location VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // User academic paths
        await client.query(`
      CREATE TABLE IF NOT EXISTS academic_paths (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        major VARCHAR(255) NOT NULL,
        school VARCHAR(255) NOT NULL,
        graduation_year INTEGER NOT NULL,
        total_credits INTEGER DEFAULT 120,
        completed_credits INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // User course enrollments
        await client.query(`
      CREATE TABLE IF NOT EXISTS user_courses (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
        semester VARCHAR(20) NOT NULL,
        status VARCHAR(20) CHECK (status IN ('planned', 'enrolled', 'completed', 'dropped')),
        grade VARCHAR(5),
        credits INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Jobs table
        await client.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        external_id VARCHAR(255), -- ID from external API
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        type VARCHAR(20) CHECK (type IN ('full-time', 'part-time', 'internship', 'co-op')),
        remote BOOLEAN DEFAULT FALSE,
        description TEXT,
        requirements TEXT[],
        skills TEXT[],
        salary_min INTEGER,
        salary_max INTEGER,
        posted_date TIMESTAMP,
        application_deadline TIMESTAMP,
        application_url VARCHAR(500),
        source VARCHAR(50), -- API source
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // User bookmarks
        await client.query(`
      CREATE TABLE IF NOT EXISTS bookmarks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        item_type VARCHAR(20) CHECK (item_type IN ('job', 'course', 'professor')),
        item_id UUID NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, item_type, item_id)
      )
    `);
        // AI career advice history
        await client.query(`
      CREATE TABLE IF NOT EXISTS career_advice (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(20) CHECK (type IN ('resume', 'interview', 'certification', 'skills')),
        prompt TEXT NOT NULL,
        response TEXT NOT NULL,
        job_id UUID,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        // Create indexes for better performance
        await client.query('CREATE INDEX IF NOT EXISTS idx_users_firebase_uid ON users(firebase_uid)');
        await client.query('CREATE INDEX IF NOT EXISTS idx_courses_school_code ON courses(school_id, code)');
        await client.query('CREATE INDEX IF NOT EXISTS idx_jobs_type_location ON jobs(type, location)');
        await client.query('CREATE INDEX IF NOT EXISTS idx_user_courses_user_semester ON user_courses(user_id, semester)');
        await client.query('CREATE INDEX IF NOT EXISTS idx_bookmarks_user_type ON bookmarks(user_id, item_type)');
        client.release();
        logger_1.logger.info('✅ Database tables initialized successfully');
    }
    catch (error) {
        logger_1.logger.error('❌ Failed to initialize database:', error);
        throw error;
    }
};
exports.initializeDatabase = initializeDatabase;
//# sourceMappingURL=database.js.map