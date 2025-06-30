"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobFiltersSchema = exports.CourseFiltersSchema = exports.PaginationSchema = exports.ApiResponseSchema = exports.BookmarkSchema = exports.CareerAdviceSchema = exports.SkillsMatchSchema = exports.JobSchema = exports.AcademicPathSchema = exports.CourseOfferingSchema = exports.ProfessorSchema = exports.CourseSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
// User Management Types
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string().email(),
    displayName: zod_1.z.string().optional(),
    school: zod_1.z.string().optional(),
    major: zod_1.z.string().optional(),
    graduationYear: zod_1.z.number().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
// Course Types
exports.CourseSchema = zod_1.z.object({
    id: zod_1.z.string(),
    code: zod_1.z.string(), // e.g., "CS 180"
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    credits: zod_1.z.number(),
    prerequisites: zod_1.z.array(zod_1.z.string()), // Array of course IDs
    school: zod_1.z.string(),
    department: zod_1.z.string(),
    difficulty: zod_1.z.enum(['Easy', 'Medium', 'Hard']).optional(),
    tags: zod_1.z.array(zod_1.z.string()), // e.g., ["project-heavy", "theoretical"]
    averageGPA: zod_1.z.number().optional(),
    averageWorkload: zod_1.z.number().optional(), // Hours per week
});
// Professor Types
exports.ProfessorSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    department: zod_1.z.string(),
    school: zod_1.z.string(),
    rating: zod_1.z.number().min(1).max(5).optional(),
    difficulty: zod_1.z.number().min(1).max(5).optional(),
    wouldTakeAgain: zod_1.z.number().min(0).max(100).optional(), // Percentage
    tags: zod_1.z.array(zod_1.z.string()), // e.g., ["caring", "tough grader"]
});
// Course Offering Types
exports.CourseOfferingSchema = zod_1.z.object({
    id: zod_1.z.string(),
    courseId: zod_1.z.string(),
    professorId: zod_1.z.string(),
    semester: zod_1.z.string(), // e.g., "Fall 2024"
    section: zod_1.z.string(),
    schedule: zod_1.z.object({
        days: zod_1.z.array(zod_1.z.string()), // ["Monday", "Wednesday", "Friday"]
        startTime: zod_1.z.string(),
        endTime: zod_1.z.string(),
        location: zod_1.z.string().optional(),
    }),
});
// Academic Path Types
exports.AcademicPathSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string(),
    major: zod_1.z.string(),
    school: zod_1.z.string(),
    graduationYear: zod_1.z.number(),
    semesters: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(), // e.g., "Fall 2024"
        courses: zod_1.z.array(zod_1.z.object({
            courseId: zod_1.z.string(),
            status: zod_1.z.enum(['planned', 'enrolled', 'completed', 'dropped']),
            grade: zod_1.z.string().optional(),
            credits: zod_1.z.number(),
        })),
    })),
    totalCredits: zod_1.z.number(),
    completedCredits: zod_1.z.number(),
    progressPercentage: zod_1.z.number(),
});
// Job/Internship Types
exports.JobSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    company: zod_1.z.string(),
    location: zod_1.z.string(),
    type: zod_1.z.enum(['full-time', 'part-time', 'internship', 'co-op']),
    remote: zod_1.z.boolean(),
    description: zod_1.z.string(),
    requirements: zod_1.z.array(zod_1.z.string()),
    skills: zod_1.z.array(zod_1.z.string()),
    salaryMin: zod_1.z.number().optional(),
    salaryMax: zod_1.z.number().optional(),
    postedDate: zod_1.z.date(),
    applicationDeadline: zod_1.z.date().optional(),
    applicationUrl: zod_1.z.string().url(),
    source: zod_1.z.string(), // API source: "adzuna", "jsearch", etc.
    relevanceScore: zod_1.z.number().min(0).max(100).optional(),
});
// Skills Matching Types
exports.SkillsMatchSchema = zod_1.z.object({
    jobId: zod_1.z.string(),
    userId: zod_1.z.string(),
    requiredSkills: zod_1.z.array(zod_1.z.string()),
    userSkills: zod_1.z.array(zod_1.z.string()),
    matchedSkills: zod_1.z.array(zod_1.z.string()),
    missingSkills: zod_1.z.array(zod_1.z.string()),
    matchPercentage: zod_1.z.number().min(0).max(100),
    courseSuggestions: zod_1.z.array(zod_1.z.string()), // Course IDs that teach missing skills
});
// AI Career Assistant Types
exports.CareerAdviceSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string(),
    type: zod_1.z.enum(['resume', 'interview', 'certification', 'skills']),
    prompt: zod_1.z.string(),
    response: zod_1.z.string(),
    jobId: zod_1.z.string().optional(),
    createdAt: zod_1.z.date(),
});
// Export/Bookmark Types
exports.BookmarkSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string(),
    type: zod_1.z.enum(['job', 'course', 'professor']),
    itemId: zod_1.z.string(),
    notes: zod_1.z.string().optional(),
    createdAt: zod_1.z.date(),
});
// API Response Types
exports.ApiResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    message: zod_1.z.string().optional(),
    data: zod_1.z.any().optional(),
    error: zod_1.z.string().optional(),
});
// Pagination Types
exports.PaginationSchema = zod_1.z.object({
    page: zod_1.z.number().min(1),
    limit: zod_1.z.number().min(1).max(100),
    total: zod_1.z.number(),
    totalPages: zod_1.z.number(),
});
// Search/Filter Types
exports.CourseFiltersSchema = zod_1.z.object({
    school: zod_1.z.string().optional(),
    department: zod_1.z.string().optional(),
    credits: zod_1.z.number().optional(),
    difficulty: zod_1.z.enum(['Easy', 'Medium', 'Hard']).optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    hasPrerequisites: zod_1.z.boolean().optional(),
});
exports.JobFiltersSchema = zod_1.z.object({
    type: zod_1.z.enum(['full-time', 'part-time', 'internship', 'co-op']).optional(),
    location: zod_1.z.string().optional(),
    remote: zod_1.z.boolean().optional(),
    salaryMin: zod_1.z.number().optional(),
    salaryMax: zod_1.z.number().optional(),
    skills: zod_1.z.array(zod_1.z.string()).optional(),
    company: zod_1.z.string().optional(),
});
//# sourceMappingURL=types.js.map