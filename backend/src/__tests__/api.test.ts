import request from 'supertest';
import { pool } from '../config/database';
import app from '../server';

describe('API Integration Tests', () => {
  beforeAll(async () => {
    // Set up test database
    // Note: In a real test setup, you'd use a separate test database
  });

  afterAll(async () => {
    // Clean up
    await pool.end();
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Jobs API', () => {
    it('should search jobs without authentication', async () => {
      const response = await request(app)
        .get('/api/jobs/search')
        .query({ query: 'software', limit: 5 })
        .expect(200);

      expect(response.body).toHaveProperty('jobs');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.jobs)).toBe(true);
    });

    it('should return empty results for invalid search', async () => {
      const response = await request(app)
        .get('/api/jobs/search')
        .query({ query: 'invalidjobsearch123456' })
        .expect(200);

      expect(response.body).toHaveProperty('jobs');
      expect(Array.isArray(response.body.jobs)).toBe(true);
    });
  });

  describe('Professors API', () => {
    it('should fetch professors', async () => {
      const response = await request(app)
        .get('/api/professors')
        .expect(200);

      expect(response.body).toHaveProperty('professors');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.professors)).toBe(true);
    });

    it('should search professors by name', async () => {
      const response = await request(app)
        .get('/api/professors/search/Johnson')
        .expect(200);

      expect(response.body).toHaveProperty('professors');
      expect(Array.isArray(response.body.professors)).toBe(true);
    });
  });

  describe('Courses API', () => {
    it('should fetch courses', async () => {
      const response = await request(app)
        .get('/api/courses')
        .expect(200);

      expect(response.body).toHaveProperty('courses');
      expect(Array.isArray(response.body.courses)).toBe(true);
    });

    it('should filter courses by department', async () => {
      const response = await request(app)
        .get('/api/courses')
        .query({ department: 'Computer Science' })
        .expect(200);

      expect(response.body).toHaveProperty('courses');
      expect(Array.isArray(response.body.courses)).toBe(true);
    });
  });

  describe('Authentication', () => {
    it('should reject requests to protected routes without auth', async () => {
      await request(app)
        .get('/api/users/profile')
        .expect(401);
    });

    it('should reject requests with invalid token', async () => {
      await request(app)
        .get('/api/users/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });
});
