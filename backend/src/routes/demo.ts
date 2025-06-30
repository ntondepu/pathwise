import { Router, Request, Response } from 'express';
import { logger } from '../utils/logger';

const router = Router();

// Demo data that works without external APIs
const demoData = {
  courses: [
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Computer Science',
      description: 'Fundamental concepts of programming and computer science',
      credits: 3,
      difficulty: 'Beginner',
      department: 'Computer Science',
      prerequisites: [],
      avgGpa: 3.2,
      enrollmentCount: 150
    },
    {
      id: 2,
      code: 'CS201',
      name: 'Data Structures and Algorithms',
      description: 'Core data structures and algorithmic thinking',
      credits: 4,
      difficulty: 'Intermediate',
      department: 'Computer Science',
      prerequisites: ['CS101'],
      avgGpa: 2.8,
      enrollmentCount: 120
    },
    {
      id: 3,
      code: 'MATH151',
      name: 'Calculus I',
      description: 'Differential calculus and applications',
      credits: 4,
      difficulty: 'Intermediate',
      department: 'Mathematics',
      prerequisites: [],
      avgGpa: 2.5,
      enrollmentCount: 200
    }
  ],
  jobs: [
    {
      id: 1,
      title: 'Software Engineer Intern',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Internship',
      description: 'Work on full-stack applications using React and Node.js',
      requirements: ['JavaScript', 'React', 'Node.js'],
      salary: '$25/hour',
      remote: true,
      datePosted: '2025-06-28'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'Austin, TX',
      type: 'Full-time',
      description: 'Build responsive web applications with modern frameworks',
      requirements: ['React', 'TypeScript', 'CSS'],
      salary: '$75,000 - $90,000',
      remote: false,
      datePosted: '2025-06-27'
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'DataLabs',
      location: 'Remote',
      type: 'Internship',
      description: 'Analyze datasets and build machine learning models',
      requirements: ['Python', 'Pandas', 'Machine Learning'],
      salary: '$20/hour',
      remote: true,
      datePosted: '2025-06-26'
    }
  ],
  professors: [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      department: 'Computer Science',
      rating: 4.5,
      difficulty: 3.2,
      courses: ['CS101', 'CS201'],
      reviewCount: 45,
      tags: ['Clear explanations', 'Helpful', 'Fair grading']
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      department: 'Mathematics',
      rating: 4.0,
      difficulty: 3.8,
      courses: ['MATH151', 'MATH152'],
      reviewCount: 32,
      tags: ['Challenging', 'Knowledgeable', 'Available for help']
    }
  ]
};

// Get demo courses
router.get('/courses', (req: Request, res: Response) => {
  try {
    logger.info('Fetching demo courses');
    res.json({
      success: true,
      data: demoData.courses,
      total: demoData.courses.length
    });
  } catch (error) {
    logger.error('Error fetching demo courses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch courses'
    });
  }
});

// Get demo jobs
router.get('/jobs', (req: Request, res: Response) => {
  try {
    logger.info('Fetching demo jobs');
    res.json({
      success: true,
      data: demoData.jobs,
      total: demoData.jobs.length
    });
  } catch (error) {
    logger.error('Error fetching demo jobs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch jobs'
    });
  }
});

// Get demo professors
router.get('/professors', (req: Request, res: Response) => {
  try {
    logger.info('Fetching demo professors');
    res.json({
      success: true,
      data: demoData.professors,
      total: demoData.professors.length
    });
  } catch (error) {
    logger.error('Error fetching demo professors:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch professors'
    });
  }
});

// Demo AI responses (without OpenAI API)
router.post('/ai/resume-help', (req: Request, res: Response) => {
  try {
    const { jobTitle = 'Software Engineer' } = req.body;
    
    const demoResponse = `Based on your coursework, here are 5 strong resume bullet points for a ${jobTitle} position:

1. Developed full-stack applications using React, Node.js, and PostgreSQL through coursework projects
2. Implemented data structures and algorithms in multiple programming languages (Java, Python, JavaScript)
3. Collaborated on team projects using Git version control and Agile development methodologies
4. Built responsive web interfaces with modern CSS frameworks and accessibility best practices
5. Analyzed and optimized algorithm performance with O(n) complexity analysis and benchmarking`;

    res.json({
      success: true,
      data: {
        response: demoResponse,
        jobTitle,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Error generating demo resume help:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate resume help'
    });
  }
});

// Demo career paths
router.get('/paths', (req: Request, res: Response) => {
  try {
    const demoPaths = [
      {
        id: 1,
        title: 'Software Engineering Track',
        description: 'Full-stack development career path',
        courses: ['CS101', 'CS201', 'CS301', 'CS401'],
        duration: '4 years',
        careerOutcomes: ['Software Engineer', 'Full Stack Developer', 'Senior Developer']
      },
      {
        id: 2,
        title: 'Data Science Track',
        description: 'Analytics and machine learning career path',
        courses: ['CS101', 'MATH151', 'STAT201', 'CS350'],
        duration: '4 years',
        careerOutcomes: ['Data Scientist', 'ML Engineer', 'Research Analyst']
      }
    ];

    res.json({
      success: true,
      data: demoPaths,
      total: demoPaths.length
    });
  } catch (error) {
    logger.error('Error fetching demo paths:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch paths'
    });
  }
});

export default router;
