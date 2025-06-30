"use strict";
// Utility functions for the CoursePathAI application
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateGPA = calculateGPA;
exports.calculateProgress = calculateProgress;
exports.formatSemester = formatSemester;
exports.parseSemester = parseSemester;
exports.calculateSkillsMatch = calculateSkillsMatch;
exports.generateId = generateId;
exports.formatCurrency = formatCurrency;
exports.formatDate = formatDate;
exports.isValidEmail = isValidEmail;
exports.extractCourseCode = extractCourseCode;
exports.sortCoursesByPrerequisites = sortCoursesByPrerequisites;
exports.estimateTimeToGraduation = estimateTimeToGraduation;
exports.debounce = debounce;
/**
 * Calculate GPA from grades and credits
 */
function calculateGPA(courses) {
    const gradePoints = {
        'A+': 4.0, 'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 'D-': 0.7,
        'F': 0.0
    };
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(course => {
        const points = gradePoints[course.grade];
        if (points !== undefined) {
            totalPoints += points * course.credits;
            totalCredits += course.credits;
        }
    });
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
}
/**
 * Calculate progress percentage towards graduation
 */
function calculateProgress(completedCredits, totalCredits) {
    return Math.min(100, Math.round((completedCredits / totalCredits) * 100));
}
/**
 * Format semester name consistently
 */
function formatSemester(season, year) {
    return `${season} ${year}`;
}
/**
 * Parse semester string into components
 */
function parseSemester(semester) {
    const parts = semester.split(' ');
    return {
        season: parts[0],
        year: parseInt(parts[1], 10)
    };
}
/**
 * Calculate skills match percentage
 */
function calculateSkillsMatch(userSkills, jobSkills) {
    const userSkillsLower = userSkills.map(skill => skill.toLowerCase());
    const jobSkillsLower = jobSkills.map(skill => skill.toLowerCase());
    const matchedSkills = jobSkills.filter(skill => userSkillsLower.includes(skill.toLowerCase()));
    const missingSkills = jobSkills.filter(skill => !userSkillsLower.includes(skill.toLowerCase()));
    const matchPercentage = jobSkills.length > 0
        ? Math.round((matchedSkills.length / jobSkills.length) * 100)
        : 0;
    return { matchedSkills, missingSkills, matchPercentage };
}
/**
 * Generate a unique ID
 */
function generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
/**
 * Format currency for salary display
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
/**
 * Format date for display
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}
/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Extract course code from full course string
 */
function extractCourseCode(courseString) {
    // Extract patterns like "CS 180", "MATH 261", etc.
    const match = courseString.match(/^([A-Z]{2,4})\s*(\d{3,4})/);
    return match ? `${match[1]} ${match[2]}` : courseString;
}
/**
 * Sort courses by prerequisites (topological sort)
 */
function sortCoursesByPrerequisites(courses) {
    const visited = new Set();
    const result = [];
    function visit(courseId, visiting = new Set()) {
        if (visiting.has(courseId)) {
            // Circular dependency, skip
            return;
        }
        if (visited.has(courseId)) {
            return;
        }
        visiting.add(courseId);
        const course = courses.find(c => c.id === courseId);
        if (course) {
            course.prerequisites.forEach(prereqId => {
                visit(prereqId, visiting);
            });
        }
        visiting.delete(courseId);
        visited.add(courseId);
        result.push(courseId);
    }
    courses.forEach(course => {
        visit(course.id);
    });
    return result;
}
/**
 * Calculate estimated time to complete remaining courses
 */
function estimateTimeToGraduation(remainingCredits, creditsPerSemester = 15) {
    const semesters = Math.ceil(remainingCredits / creditsPerSemester);
    const years = Math.ceil(semesters / 2);
    return { semesters, years };
}
/**
 * Debounce function for search inputs
 */
function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}
//# sourceMappingURL=utils.js.map