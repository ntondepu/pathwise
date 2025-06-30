import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { User, Course, Job, AcademicPath, CareerAdvice, Bookmark } from '@coursepath-ai/shared';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        // Token will be passed as parameter in methods
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error) => {
        const message = error.response?.data?.error || error.message || 'An error occurred';
        return Promise.reject(new Error(message));
      }
    );
  }

  // Auth endpoints
  auth = {
    register: async (userData: { email: string; displayName?: string; school?: string; major?: string; graduationYear?: number }, token: string): Promise<User> => {
      const response = await this.client.post('/api/auth/register', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },

    getProfile: async (token: string): Promise<User> => {
      const response = await this.client.get('/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },

    updateProfile: async (userData: Partial<User>, token: string): Promise<User> => {
      const response = await this.client.put('/api/auth/profile', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
  };

  // Course endpoints
  courses = {
    getAll: async (params?: { school?: string; department?: string; search?: string }, token?: string): Promise<Course[]> => {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await this.client.get('/api/courses', { params, headers });
      return response.data;
    },

    getById: async (id: string, token?: string): Promise<Course> => {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await this.client.get(`/api/courses/${id}`, { headers });
      return response.data;
    },

    getPrerequisites: async (courseId: string, token?: string): Promise<Course[]> => {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await this.client.get(`/api/courses/${courseId}/prerequisites`, { headers });
      return response.data;
    },
  };

  // Job endpoints
  jobs = {
    search: async (params: {
      query?: string;
      location?: string;
      type?: string;
      remote?: boolean;
      major?: string;
      page?: number;
      limit?: number;
    }, token?: string): Promise<{ jobs: Job[]; total: number; page: number; totalPages: number }> => {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await this.client.get('/api/jobs/search', { params, headers });
      return response.data;
    },

    getById: async (id: string, token?: string): Promise<Job> => {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await this.client.get(`/api/jobs/${id}`, { headers });
      return response.data;
    },

    getSkillsMatch: async (jobId: string, token: string): Promise<{ matchPercentage: number; matchedSkills: string[]; missingSkills: string[] }> => {
      const response = await this.client.get(`/api/jobs/${jobId}/skills-match`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
  };

  // Academic path endpoints
  paths = {
    get: async (token: string): Promise<AcademicPath | null> => {
      const response = await this.client.get('/api/paths', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },

    create: async (pathData: { major: string; school: string; graduationYear: number }, token: string): Promise<AcademicPath> => {
      const response = await this.client.post('/api/paths', pathData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },

    update: async (pathData: Partial<AcademicPath>, token: string): Promise<AcademicPath> => {
      const response = await this.client.put('/api/paths', pathData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },

    addCourse: async (courseData: { courseId: string; semester: string; status: string }, token: string): Promise<void> => {
      await this.client.post('/api/paths/courses', courseData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },

    updateCourse: async (courseId: string, updateData: { status?: string; grade?: string; semester?: string }, token: string): Promise<void> => {
      await this.client.put(`/api/paths/courses/${courseId}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
  };

  // AI Assistant endpoints
  ai = {
    generateResumeHelp: async (data: { courses: string[]; skills: string[]; jobTitle: string }, token: string): Promise<CareerAdvice> => {
      const response = await this.client.post('/api/ai/resume-help', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },

    generateInterviewQuestions: async (data: { courses: string[]; skills: string[]; jobTitle: string }, token: string): Promise<CareerAdvice> => {
      const response = await this.client.post('/api/ai/interview-prep', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },

    getCertificationRecommendations: async (data: { major: string; courses: string[]; targetJob: string }, token: string): Promise<CareerAdvice> => {
      const response = await this.client.post('/api/ai/certifications', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },

    getHistory: async (token: string): Promise<CareerAdvice[]> => {
      const response = await this.client.get('/api/ai/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
  };

  // Bookmark endpoints
  bookmarks = {
    getAll: async (token: string): Promise<Bookmark[]> => {
      const response = await this.client.get('/api/bookmarks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },

    add: async (data: { type: 'job' | 'course' | 'professor'; itemId: string; notes?: string }, token: string): Promise<Bookmark> => {
      const response = await this.client.post('/api/bookmarks', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },

    remove: async (id: string, token: string): Promise<void> => {
      await this.client.delete(`/api/bookmarks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
  };

  // Demo endpoints (working without external APIs)
  demo = {
    getCourses: async (): Promise<Course[]> => {
      const response = await this.client.get('/api/demo/courses');
      return response.data;
    },

    getJobs: async (): Promise<Job[]> => {
      const response = await this.client.get('/api/demo/jobs');
      return response.data;
    },

    getProfessors: async (): Promise<any[]> => {
      const response = await this.client.get('/api/demo/professors');
      return response.data;
    },

    getPaths: async (): Promise<AcademicPath[]> => {
      const response = await this.client.get('/api/demo/paths');
      return response.data;
    },

    getResumeHelp: async (jobTitle: string): Promise<{ response: string; jobTitle: string; generatedAt: string }> => {
      const response = await this.client.post('/api/demo/ai/resume-help', { jobTitle });
      return response.data;
    },
  };
}

export const api = new ApiService();
