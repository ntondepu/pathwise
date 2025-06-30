import { z } from 'zod';

// User Management Types
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string().optional(),
  school: z.string().optional(),
  major: z.string().optional(),
  graduationYear: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

// Course Types
export const CourseSchema = z.object({
  id: z.string(),
  code: z.string(), // e.g., "CS 180"
  title: z.string(),
  description: z.string(),
  credits: z.number(),
  prerequisites: z.array(z.string()), // Array of course IDs
  school: z.string(),
  department: z.string(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
  tags: z.array(z.string()), // e.g., ["project-heavy", "theoretical"]
  averageGPA: z.number().optional(),
  averageWorkload: z.number().optional(), // Hours per week
});

export type Course = z.infer<typeof CourseSchema>;

// Professor Types
export const ProfessorSchema = z.object({
  id: z.string(),
  name: z.string(),
  department: z.string(),
  school: z.string(),
  rating: z.number().min(1).max(5).optional(),
  difficulty: z.number().min(1).max(5).optional(),
  wouldTakeAgain: z.number().min(0).max(100).optional(), // Percentage
  tags: z.array(z.string()), // e.g., ["caring", "tough grader"]
});

export type Professor = z.infer<typeof ProfessorSchema>;

// Course Offering Types
export const CourseOfferingSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  professorId: z.string(),
  semester: z.string(), // e.g., "Fall 2024"
  section: z.string(),
  schedule: z.object({
    days: z.array(z.string()), // ["Monday", "Wednesday", "Friday"]
    startTime: z.string(),
    endTime: z.string(),
    location: z.string().optional(),
  }),
});

export type CourseOffering = z.infer<typeof CourseOfferingSchema>;

// Academic Path Types
export const AcademicPathSchema = z.object({
  id: z.string(),
  userId: z.string(),
  major: z.string(),
  school: z.string(),
  graduationYear: z.number(),
  semesters: z.array(z.object({
    name: z.string(), // e.g., "Fall 2024"
    courses: z.array(z.object({
      courseId: z.string(),
      status: z.enum(['planned', 'enrolled', 'completed', 'dropped']),
      grade: z.string().optional(),
      credits: z.number(),
    })),
  })),
  totalCredits: z.number(),
  completedCredits: z.number(),
  progressPercentage: z.number(),
});

export type AcademicPath = z.infer<typeof AcademicPathSchema>;

// Job/Internship Types
export const JobSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  location: z.string(),
  type: z.enum(['full-time', 'part-time', 'internship', 'co-op']),
  remote: z.boolean(),
  description: z.string(),
  requirements: z.array(z.string()),
  skills: z.array(z.string()),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  postedDate: z.date(),
  applicationDeadline: z.date().optional(),
  applicationUrl: z.string().url(),
  source: z.string(), // API source: "adzuna", "jsearch", etc.
  relevanceScore: z.number().min(0).max(100).optional(),
});

export type Job = z.infer<typeof JobSchema>;

// Skills Matching Types
export const SkillsMatchSchema = z.object({
  jobId: z.string(),
  userId: z.string(),
  requiredSkills: z.array(z.string()),
  userSkills: z.array(z.string()),
  matchedSkills: z.array(z.string()),
  missingSkills: z.array(z.string()),
  matchPercentage: z.number().min(0).max(100),
  courseSuggestions: z.array(z.string()), // Course IDs that teach missing skills
});

export type SkillsMatch = z.infer<typeof SkillsMatchSchema>;

// AI Career Assistant Types
export const CareerAdviceSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(['resume', 'interview', 'certification', 'skills']),
  prompt: z.string(),
  response: z.string(),
  jobId: z.string().optional(),
  createdAt: z.date(),
});

export type CareerAdvice = z.infer<typeof CareerAdviceSchema>;

// Export/Bookmark Types
export const BookmarkSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(['job', 'course', 'professor']),
  itemId: z.string(),
  notes: z.string().optional(),
  createdAt: z.date(),
});

export type Bookmark = z.infer<typeof BookmarkSchema>;

// API Response Types
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  error: z.string().optional(),
});

export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
};

// Pagination Types
export const PaginationSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1).max(100),
  total: z.number(),
  totalPages: z.number(),
});

export type Pagination = z.infer<typeof PaginationSchema>;

// Search/Filter Types
export const CourseFiltersSchema = z.object({
  school: z.string().optional(),
  department: z.string().optional(),
  credits: z.number().optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
  tags: z.array(z.string()).optional(),
  hasPrerequisites: z.boolean().optional(),
});

export type CourseFilters = z.infer<typeof CourseFiltersSchema>;

export const JobFiltersSchema = z.object({
  type: z.enum(['full-time', 'part-time', 'internship', 'co-op']).optional(),
  location: z.string().optional(),
  remote: z.boolean().optional(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  skills: z.array(z.string()).optional(),
  company: z.string().optional(),
});

export type JobFilters = z.infer<typeof JobFiltersSchema>;
