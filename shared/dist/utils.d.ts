/**
 * Calculate GPA from grades and credits
 */
export declare function calculateGPA(courses: Array<{
    grade: string;
    credits: number;
}>): number;
/**
 * Calculate progress percentage towards graduation
 */
export declare function calculateProgress(completedCredits: number, totalCredits: number): number;
/**
 * Format semester name consistently
 */
export declare function formatSemester(season: string, year: number): string;
/**
 * Parse semester string into components
 */
export declare function parseSemester(semester: string): {
    season: string;
    year: number;
};
/**
 * Calculate skills match percentage
 */
export declare function calculateSkillsMatch(userSkills: string[], jobSkills: string[]): {
    matchedSkills: string[];
    missingSkills: string[];
    matchPercentage: number;
};
/**
 * Generate a unique ID
 */
export declare function generateId(): string;
/**
 * Format currency for salary display
 */
export declare function formatCurrency(amount: number): string;
/**
 * Format date for display
 */
export declare function formatDate(date: Date): string;
/**
 * Validate email format
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Extract course code from full course string
 */
export declare function extractCourseCode(courseString: string): string;
/**
 * Sort courses by prerequisites (topological sort)
 */
export declare function sortCoursesByPrerequisites(courses: Array<{
    id: string;
    prerequisites: string[];
}>): string[];
/**
 * Calculate estimated time to complete remaining courses
 */
export declare function estimateTimeToGraduation(remainingCredits: number, creditsPerSemester?: number): {
    semesters: number;
    years: number;
};
/**
 * Debounce function for search inputs
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void;
//# sourceMappingURL=utils.d.ts.map