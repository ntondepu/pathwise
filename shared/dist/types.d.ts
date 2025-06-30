import { z } from 'zod';
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    displayName: z.ZodOptional<z.ZodString>;
    school: z.ZodOptional<z.ZodString>;
    major: z.ZodOptional<z.ZodString>;
    graduationYear: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    displayName?: string | undefined;
    school?: string | undefined;
    major?: string | undefined;
    graduationYear?: number | undefined;
}, {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    displayName?: string | undefined;
    school?: string | undefined;
    major?: string | undefined;
    graduationYear?: number | undefined;
}>;
export type User = z.infer<typeof UserSchema>;
export declare const CourseSchema: z.ZodObject<{
    id: z.ZodString;
    code: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    credits: z.ZodNumber;
    prerequisites: z.ZodArray<z.ZodString, "many">;
    school: z.ZodString;
    department: z.ZodString;
    difficulty: z.ZodOptional<z.ZodEnum<["Easy", "Medium", "Hard"]>>;
    tags: z.ZodArray<z.ZodString, "many">;
    averageGPA: z.ZodOptional<z.ZodNumber>;
    averageWorkload: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string;
    school: string;
    code: string;
    title: string;
    description: string;
    credits: number;
    prerequisites: string[];
    department: string;
    tags: string[];
    difficulty?: "Easy" | "Medium" | "Hard" | undefined;
    averageGPA?: number | undefined;
    averageWorkload?: number | undefined;
}, {
    id: string;
    school: string;
    code: string;
    title: string;
    description: string;
    credits: number;
    prerequisites: string[];
    department: string;
    tags: string[];
    difficulty?: "Easy" | "Medium" | "Hard" | undefined;
    averageGPA?: number | undefined;
    averageWorkload?: number | undefined;
}>;
export type Course = z.infer<typeof CourseSchema>;
export declare const ProfessorSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    department: z.ZodString;
    school: z.ZodString;
    rating: z.ZodOptional<z.ZodNumber>;
    difficulty: z.ZodOptional<z.ZodNumber>;
    wouldTakeAgain: z.ZodOptional<z.ZodNumber>;
    tags: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    school: string;
    department: string;
    tags: string[];
    name: string;
    difficulty?: number | undefined;
    rating?: number | undefined;
    wouldTakeAgain?: number | undefined;
}, {
    id: string;
    school: string;
    department: string;
    tags: string[];
    name: string;
    difficulty?: number | undefined;
    rating?: number | undefined;
    wouldTakeAgain?: number | undefined;
}>;
export type Professor = z.infer<typeof ProfessorSchema>;
export declare const CourseOfferingSchema: z.ZodObject<{
    id: z.ZodString;
    courseId: z.ZodString;
    professorId: z.ZodString;
    semester: z.ZodString;
    section: z.ZodString;
    schedule: z.ZodObject<{
        days: z.ZodArray<z.ZodString, "many">;
        startTime: z.ZodString;
        endTime: z.ZodString;
        location: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        days: string[];
        startTime: string;
        endTime: string;
        location?: string | undefined;
    }, {
        days: string[];
        startTime: string;
        endTime: string;
        location?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    courseId: string;
    professorId: string;
    semester: string;
    section: string;
    schedule: {
        days: string[];
        startTime: string;
        endTime: string;
        location?: string | undefined;
    };
}, {
    id: string;
    courseId: string;
    professorId: string;
    semester: string;
    section: string;
    schedule: {
        days: string[];
        startTime: string;
        endTime: string;
        location?: string | undefined;
    };
}>;
export type CourseOffering = z.infer<typeof CourseOfferingSchema>;
export declare const AcademicPathSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    major: z.ZodString;
    school: z.ZodString;
    graduationYear: z.ZodNumber;
    semesters: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        courses: z.ZodArray<z.ZodObject<{
            courseId: z.ZodString;
            status: z.ZodEnum<["planned", "enrolled", "completed", "dropped"]>;
            grade: z.ZodOptional<z.ZodString>;
            credits: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            status: "planned" | "enrolled" | "completed" | "dropped";
            credits: number;
            courseId: string;
            grade?: string | undefined;
        }, {
            status: "planned" | "enrolled" | "completed" | "dropped";
            credits: number;
            courseId: string;
            grade?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        courses: {
            status: "planned" | "enrolled" | "completed" | "dropped";
            credits: number;
            courseId: string;
            grade?: string | undefined;
        }[];
    }, {
        name: string;
        courses: {
            status: "planned" | "enrolled" | "completed" | "dropped";
            credits: number;
            courseId: string;
            grade?: string | undefined;
        }[];
    }>, "many">;
    totalCredits: z.ZodNumber;
    completedCredits: z.ZodNumber;
    progressPercentage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    school: string;
    major: string;
    graduationYear: number;
    userId: string;
    semesters: {
        name: string;
        courses: {
            status: "planned" | "enrolled" | "completed" | "dropped";
            credits: number;
            courseId: string;
            grade?: string | undefined;
        }[];
    }[];
    totalCredits: number;
    completedCredits: number;
    progressPercentage: number;
}, {
    id: string;
    school: string;
    major: string;
    graduationYear: number;
    userId: string;
    semesters: {
        name: string;
        courses: {
            status: "planned" | "enrolled" | "completed" | "dropped";
            credits: number;
            courseId: string;
            grade?: string | undefined;
        }[];
    }[];
    totalCredits: number;
    completedCredits: number;
    progressPercentage: number;
}>;
export type AcademicPath = z.infer<typeof AcademicPathSchema>;
export declare const JobSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    company: z.ZodString;
    location: z.ZodString;
    type: z.ZodEnum<["full-time", "part-time", "internship", "co-op"]>;
    remote: z.ZodBoolean;
    description: z.ZodString;
    requirements: z.ZodArray<z.ZodString, "many">;
    skills: z.ZodArray<z.ZodString, "many">;
    salaryMin: z.ZodOptional<z.ZodNumber>;
    salaryMax: z.ZodOptional<z.ZodNumber>;
    postedDate: z.ZodDate;
    applicationDeadline: z.ZodOptional<z.ZodDate>;
    applicationUrl: z.ZodString;
    source: z.ZodString;
    relevanceScore: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "full-time" | "part-time" | "internship" | "co-op";
    title: string;
    description: string;
    location: string;
    company: string;
    remote: boolean;
    requirements: string[];
    skills: string[];
    postedDate: Date;
    applicationUrl: string;
    source: string;
    salaryMin?: number | undefined;
    salaryMax?: number | undefined;
    applicationDeadline?: Date | undefined;
    relevanceScore?: number | undefined;
}, {
    id: string;
    type: "full-time" | "part-time" | "internship" | "co-op";
    title: string;
    description: string;
    location: string;
    company: string;
    remote: boolean;
    requirements: string[];
    skills: string[];
    postedDate: Date;
    applicationUrl: string;
    source: string;
    salaryMin?: number | undefined;
    salaryMax?: number | undefined;
    applicationDeadline?: Date | undefined;
    relevanceScore?: number | undefined;
}>;
export type Job = z.infer<typeof JobSchema>;
export declare const SkillsMatchSchema: z.ZodObject<{
    jobId: z.ZodString;
    userId: z.ZodString;
    requiredSkills: z.ZodArray<z.ZodString, "many">;
    userSkills: z.ZodArray<z.ZodString, "many">;
    matchedSkills: z.ZodArray<z.ZodString, "many">;
    missingSkills: z.ZodArray<z.ZodString, "many">;
    matchPercentage: z.ZodNumber;
    courseSuggestions: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    userId: string;
    jobId: string;
    requiredSkills: string[];
    userSkills: string[];
    matchedSkills: string[];
    missingSkills: string[];
    matchPercentage: number;
    courseSuggestions: string[];
}, {
    userId: string;
    jobId: string;
    requiredSkills: string[];
    userSkills: string[];
    matchedSkills: string[];
    missingSkills: string[];
    matchPercentage: number;
    courseSuggestions: string[];
}>;
export type SkillsMatch = z.infer<typeof SkillsMatchSchema>;
export declare const CareerAdviceSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    type: z.ZodEnum<["resume", "interview", "certification", "skills"]>;
    prompt: z.ZodString;
    response: z.ZodString;
    jobId: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    type: "skills" | "resume" | "interview" | "certification";
    userId: string;
    prompt: string;
    response: string;
    jobId?: string | undefined;
}, {
    id: string;
    createdAt: Date;
    type: "skills" | "resume" | "interview" | "certification";
    userId: string;
    prompt: string;
    response: string;
    jobId?: string | undefined;
}>;
export type CareerAdvice = z.infer<typeof CareerAdviceSchema>;
export declare const BookmarkSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    type: z.ZodEnum<["job", "course", "professor"]>;
    itemId: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    type: "job" | "course" | "professor";
    userId: string;
    itemId: string;
    notes?: string | undefined;
}, {
    id: string;
    createdAt: Date;
    type: "job" | "course" | "professor";
    userId: string;
    itemId: string;
    notes?: string | undefined;
}>;
export type Bookmark = z.infer<typeof BookmarkSchema>;
export declare const ApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    data: z.ZodOptional<z.ZodAny>;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    message?: string | undefined;
    data?: any;
    error?: string | undefined;
}, {
    success: boolean;
    message?: string | undefined;
    data?: any;
    error?: string | undefined;
}>;
export type ApiResponse<T = any> = {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
};
export declare const PaginationSchema: z.ZodObject<{
    page: z.ZodNumber;
    limit: z.ZodNumber;
    total: z.ZodNumber;
    totalPages: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}, {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}>;
export type Pagination = z.infer<typeof PaginationSchema>;
export declare const CourseFiltersSchema: z.ZodObject<{
    school: z.ZodOptional<z.ZodString>;
    department: z.ZodOptional<z.ZodString>;
    credits: z.ZodOptional<z.ZodNumber>;
    difficulty: z.ZodOptional<z.ZodEnum<["Easy", "Medium", "Hard"]>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    hasPrerequisites: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    school?: string | undefined;
    credits?: number | undefined;
    department?: string | undefined;
    difficulty?: "Easy" | "Medium" | "Hard" | undefined;
    tags?: string[] | undefined;
    hasPrerequisites?: boolean | undefined;
}, {
    school?: string | undefined;
    credits?: number | undefined;
    department?: string | undefined;
    difficulty?: "Easy" | "Medium" | "Hard" | undefined;
    tags?: string[] | undefined;
    hasPrerequisites?: boolean | undefined;
}>;
export type CourseFilters = z.infer<typeof CourseFiltersSchema>;
export declare const JobFiltersSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["full-time", "part-time", "internship", "co-op"]>>;
    location: z.ZodOptional<z.ZodString>;
    remote: z.ZodOptional<z.ZodBoolean>;
    salaryMin: z.ZodOptional<z.ZodNumber>;
    salaryMax: z.ZodOptional<z.ZodNumber>;
    skills: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    company: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: "full-time" | "part-time" | "internship" | "co-op" | undefined;
    location?: string | undefined;
    company?: string | undefined;
    remote?: boolean | undefined;
    skills?: string[] | undefined;
    salaryMin?: number | undefined;
    salaryMax?: number | undefined;
}, {
    type?: "full-time" | "part-time" | "internship" | "co-op" | undefined;
    location?: string | undefined;
    company?: string | undefined;
    remote?: boolean | undefined;
    skills?: string[] | undefined;
    salaryMin?: number | undefined;
    salaryMax?: number | undefined;
}>;
export type JobFilters = z.infer<typeof JobFiltersSchema>;
//# sourceMappingURL=types.d.ts.map