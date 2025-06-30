// Constants used throughout the CoursePathAI application

// API Endpoints
export const API_ENDPOINTS = {
  USERS: '/api/users',
  COURSES: '/api/courses',
  PROFESSORS: '/api/professors',
  JOBS: '/api/jobs',
  PATHS: '/api/paths',
  AI: '/api/ai',
  BOOKMARKS: '/api/bookmarks',
} as const;

// Grade Points Mapping
export const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0, 'W': 0.0, 'I': 0.0
} as const;

// Course Difficulty Levels
export const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'] as const;

// Job Types
export const JOB_TYPES = ['full-time', 'part-time', 'internship', 'co-op'] as const;

// Common Course Tags
export const COURSE_TAGS = [
  'project-heavy',
  'theoretical',
  'math-intensive',
  'programming',
  'group-work',
  'research',
  'lab-component',
  'writing-intensive',
  'presentation',
  'exam-heavy'
] as const;

// Semester Seasons
export const SEASONS = ['Spring', 'Summer', 'Fall'] as const;

// Days of the Week
export const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
] as const;

// Common Skills Categories
export const SKILL_CATEGORIES = {
  PROGRAMMING: [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust',
    'React', 'Angular', 'Vue.js', 'Node.js', 'Django', 'Flask', 'Spring Boot'
  ],
  DATA_SCIENCE: [
    'Python', 'R', 'SQL', 'Machine Learning', 'Deep Learning', 'TensorFlow',
    'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'Jupyter', 'Tableau'
  ],
  CLOUD: [
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform',
    'Jenkins', 'CI/CD', 'DevOps', 'Linux', 'Bash'
  ],
  SOFT_SKILLS: [
    'Communication', 'Leadership', 'Problem Solving', 'Critical Thinking',
    'Project Management', 'Teamwork', 'Time Management', 'Presentation'
  ]
} as const;

// Default Credits per Course Type
export const DEFAULT_CREDITS = {
  LECTURE: 3,
  LAB: 1,
  SEMINAR: 2,
  RESEARCH: 3,
  INTERNSHIP: 0
} as const;

// Graduation Requirements (example for CS major)
export const GRADUATION_REQUIREMENTS = {
  TOTAL_CREDITS: 120,
  MAJOR_CREDITS: 45,
  CORE_CREDITS: 30,
  ELECTIVE_CREDITS: 45,
  MIN_GPA: 2.0
} as const;

// AI Prompt Templates
export const AI_PROMPTS = {
  RESUME_BULLETS: `Based on the following courses and skills, generate 3-5 resume bullet points that highlight relevant technical skills and projects:

Courses: {courses}
Skills: {skills}
Job Title: {jobTitle}

Generate bullet points that are:
- Action-oriented (start with strong verbs)
- Quantifiable where possible
- Relevant to the job title
- Professional and concise`,

  INTERVIEW_PREP: `Generate 5 technical interview questions for a {jobTitle} position that would be appropriate for someone with the following background:

Courses: {courses}
Skills: {skills}
Experience Level: {experienceLevel}

Include a mix of:
- Technical knowledge questions
- Problem-solving scenarios
- Behavioral questions related to the role`,

  CERTIFICATION_RECOMMENDATIONS: `Based on the following profile, recommend 3 relevant certifications that would enhance job prospects:

Major: {major}
Completed Courses: {courses}
Target Job Title: {jobTitle}
Skills: {skills}

For each certification, provide:
- Certification name and provider
- Why it's relevant
- Estimated time to complete
- Cost (if known)`
} as const;

// External API Configuration
export const EXTERNAL_APIS = {
  ADZUNA: {
    BASE_URL: 'https://api.adzuna.com/v1/api/jobs',
    RATE_LIMIT: 100, // requests per hour
  },
  JSEARCH: {
    BASE_URL: 'https://jsearch.p.rapidapi.com',
    RATE_LIMIT: 1000, // requests per month
  },
  OPENAI: {
    BASE_URL: 'https://api.openai.com/v1',
    MODEL: 'gpt-3.5-turbo',
    MAX_TOKENS: 500,
  }
} as const;

// UI Constants
export const UI_CONSTANTS = {
  ITEMS_PER_PAGE: 20,
  SEARCH_DEBOUNCE_MS: 300,
  TOAST_DURATION_MS: 4000,
  MAX_FILE_SIZE_MB: 5,
  SUPPORTED_FILE_TYPES: ['.pdf', '.doc', '.docx'],
} as const;

// Color Scheme for Course Difficulty
export const DIFFICULTY_COLORS = {
  Easy: '#10B981',    // Green
  Medium: '#F59E0B',  // Yellow
  Hard: '#EF4444'     // Red
} as const;

// Progress Thresholds
export const PROGRESS_THRESHOLDS = {
  FRESHMAN: 0,
  SOPHOMORE: 25,
  JUNIOR: 50,
  SENIOR: 75,
  GRADUATE: 100
} as const;
