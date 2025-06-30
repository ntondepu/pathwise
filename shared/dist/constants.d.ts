export declare const API_ENDPOINTS: {
    readonly USERS: "/api/users";
    readonly COURSES: "/api/courses";
    readonly PROFESSORS: "/api/professors";
    readonly JOBS: "/api/jobs";
    readonly PATHS: "/api/paths";
    readonly AI: "/api/ai";
    readonly BOOKMARKS: "/api/bookmarks";
};
export declare const GRADE_POINTS: Record<string, number>;
export declare const DIFFICULTY_LEVELS: readonly ["Easy", "Medium", "Hard"];
export declare const JOB_TYPES: readonly ["full-time", "part-time", "internship", "co-op"];
export declare const COURSE_TAGS: readonly ["project-heavy", "theoretical", "math-intensive", "programming", "group-work", "research", "lab-component", "writing-intensive", "presentation", "exam-heavy"];
export declare const SEASONS: readonly ["Spring", "Summer", "Fall"];
export declare const DAYS_OF_WEEK: readonly ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export declare const SKILL_CATEGORIES: {
    readonly PROGRAMMING: readonly ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "React", "Angular", "Vue.js", "Node.js", "Django", "Flask", "Spring Boot"];
    readonly DATA_SCIENCE: readonly ["Python", "R", "SQL", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn", "Jupyter", "Tableau"];
    readonly CLOUD: readonly ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "Jenkins", "CI/CD", "DevOps", "Linux", "Bash"];
    readonly SOFT_SKILLS: readonly ["Communication", "Leadership", "Problem Solving", "Critical Thinking", "Project Management", "Teamwork", "Time Management", "Presentation"];
};
export declare const DEFAULT_CREDITS: {
    readonly LECTURE: 3;
    readonly LAB: 1;
    readonly SEMINAR: 2;
    readonly RESEARCH: 3;
    readonly INTERNSHIP: 0;
};
export declare const GRADUATION_REQUIREMENTS: {
    readonly TOTAL_CREDITS: 120;
    readonly MAJOR_CREDITS: 45;
    readonly CORE_CREDITS: 30;
    readonly ELECTIVE_CREDITS: 45;
    readonly MIN_GPA: 2;
};
export declare const AI_PROMPTS: {
    readonly RESUME_BULLETS: "Based on the following courses and skills, generate 3-5 resume bullet points that highlight relevant technical skills and projects:\n\nCourses: {courses}\nSkills: {skills}\nJob Title: {jobTitle}\n\nGenerate bullet points that are:\n- Action-oriented (start with strong verbs)\n- Quantifiable where possible\n- Relevant to the job title\n- Professional and concise";
    readonly INTERVIEW_PREP: "Generate 5 technical interview questions for a {jobTitle} position that would be appropriate for someone with the following background:\n\nCourses: {courses}\nSkills: {skills}\nExperience Level: {experienceLevel}\n\nInclude a mix of:\n- Technical knowledge questions\n- Problem-solving scenarios\n- Behavioral questions related to the role";
    readonly CERTIFICATION_RECOMMENDATIONS: "Based on the following profile, recommend 3 relevant certifications that would enhance job prospects:\n\nMajor: {major}\nCompleted Courses: {courses}\nTarget Job Title: {jobTitle}\nSkills: {skills}\n\nFor each certification, provide:\n- Certification name and provider\n- Why it's relevant\n- Estimated time to complete\n- Cost (if known)";
};
export declare const EXTERNAL_APIS: {
    readonly ADZUNA: {
        readonly BASE_URL: "https://api.adzuna.com/v1/api/jobs";
        readonly RATE_LIMIT: 100;
    };
    readonly JSEARCH: {
        readonly BASE_URL: "https://jsearch.p.rapidapi.com";
        readonly RATE_LIMIT: 1000;
    };
    readonly OPENAI: {
        readonly BASE_URL: "https://api.openai.com/v1";
        readonly MODEL: "gpt-3.5-turbo";
        readonly MAX_TOKENS: 500;
    };
};
export declare const UI_CONSTANTS: {
    readonly ITEMS_PER_PAGE: 20;
    readonly SEARCH_DEBOUNCE_MS: 300;
    readonly TOAST_DURATION_MS: 4000;
    readonly MAX_FILE_SIZE_MB: 5;
    readonly SUPPORTED_FILE_TYPES: readonly [".pdf", ".doc", ".docx"];
};
export declare const DIFFICULTY_COLORS: {
    readonly Easy: "#10B981";
    readonly Medium: "#F59E0B";
    readonly Hard: "#EF4444";
};
export declare const PROGRESS_THRESHOLDS: {
    readonly FRESHMAN: 0;
    readonly SOPHOMORE: 25;
    readonly JUNIOR: 50;
    readonly SENIOR: 75;
    readonly GRADUATE: 100;
};
//# sourceMappingURL=constants.d.ts.map