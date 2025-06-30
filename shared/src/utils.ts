// Utility functions for the CoursePathAI application

/**
 * Calculate GPA from grades and credits
 */
export function calculateGPA(courses: Array<{ grade: string; credits: number }>): number {
  const gradePoints: Record<string, number> = {
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
export function calculateProgress(completedCredits: number, totalCredits: number): number {
  return Math.min(100, Math.round((completedCredits / totalCredits) * 100));
}

/**
 * Format semester name consistently
 */
export function formatSemester(season: string, year: number): string {
  return `${season} ${year}`;
}

/**
 * Parse semester string into components
 */
export function parseSemester(semester: string): { season: string; year: number } {
  const parts = semester.split(' ');
  return {
    season: parts[0],
    year: parseInt(parts[1], 10)
  };
}

/**
 * Calculate skills match percentage
 */
export function calculateSkillsMatch(userSkills: string[], jobSkills: string[]): {
  matchedSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
} {
  const userSkillsLower = userSkills.map(skill => skill.toLowerCase());
  const jobSkillsLower = jobSkills.map(skill => skill.toLowerCase());
  
  const matchedSkills = jobSkills.filter(skill => 
    userSkillsLower.includes(skill.toLowerCase())
  );
  
  const missingSkills = jobSkills.filter(skill => 
    !userSkillsLower.includes(skill.toLowerCase())
  );
  
  const matchPercentage = jobSkills.length > 0 
    ? Math.round((matchedSkills.length / jobSkills.length) * 100)
    : 0;

  return { matchedSkills, missingSkills, matchPercentage };
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Format currency for salary display
 */
export function formatCurrency(amount: number): string {
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
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Extract course code from full course string
 */
export function extractCourseCode(courseString: string): string {
  // Extract patterns like "CS 180", "MATH 261", etc.
  const match = courseString.match(/^([A-Z]{2,4})\s*(\d{3,4})/);
  return match ? `${match[1]} ${match[2]}` : courseString;
}

/**
 * Sort courses by prerequisites (topological sort)
 */
export function sortCoursesByPrerequisites(
  courses: Array<{ id: string; prerequisites: string[] }>
): string[] {
  const visited = new Set<string>();
  const result: string[] = [];
  
  function visit(courseId: string, visiting = new Set<string>()) {
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
export function estimateTimeToGraduation(
  remainingCredits: number,
  creditsPerSemester: number = 15
): { semesters: number; years: number } {
  const semesters = Math.ceil(remainingCredits / creditsPerSemester);
  const years = Math.ceil(semesters / 2);
  
  return { semesters, years };
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
