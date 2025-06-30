import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { pool } from '../config/database';
import { logger } from '../utils/logger';
import OpenAI from 'openai';

const router = Router();

// Initialize OpenAI (conditional)
let openai: OpenAI | null = null;

if (process.env.OPENAI_API_KEY) {
  try {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    logger.info('OpenAI client initialized successfully');
  } catch (error) {
    logger.warn('Failed to initialize OpenAI client:', error);
  }
} else {
  logger.warn('OpenAI API key not configured - AI features will be disabled');
}

// Generate resume help
router.post('/resume-help', authenticate, async (req: Request, res: Response) => {
  try {
    if (!openai) {
      return res.status(503).json({
        success: false,
        error: 'AI service is not configured. Please configure OpenAI API key.'
      });
    }

    const { courses, skills, jobTitle } = req.body;
    const firebaseUid = req.user!.uid;

    const prompt = `Based on the following academic background, generate 5 strong resume bullet points for a ${jobTitle} position:

Courses completed: ${courses.join(', ')}
Technical skills: ${skills.join(', ')}

Guidelines:
- Start each bullet with an action verb
- Include specific technologies and concepts from coursework
- Quantify achievements where possible
- Make them relevant to ${jobTitle} role
- Keep each bullet under 150 characters

Format as numbered list.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0].message?.content || 'No response generated';

    // Save to database
    const client = await pool.connect();
    
    const userResult = await client.query(
      'SELECT id FROM users WHERE firebase_uid = $1',
      [firebaseUid]
    );

    if (userResult.rows.length > 0) {
      await client.query(
        `INSERT INTO career_advice (user_id, type, prompt, response)
         VALUES ($1, 'resume', $2, $3)`,
        [userResult.rows[0].id, prompt, response]
      );
    }

    client.release();

    res.json({
      success: true,
      data: {
        type: 'resume',
        response,
        createdAt: new Date()
      }
    });
  } catch (error) {
    logger.error('Error generating resume help:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate resume help'
    });
  }
});

// Generate interview preparation
router.post('/interview-prep', authenticate, async (req: Request, res: Response) => {
  try {
    if (!openai) {
      return res.status(503).json({
        success: false,
        error: 'AI service is not configured. Please configure OpenAI API key.'
      });
    }

    const { courses, skills, jobTitle } = req.body;
    const firebaseUid = req.user!.uid;

    const prompt = `Generate 8 interview questions for a ${jobTitle} position for someone with this background:

Courses: ${courses.join(', ')}
Skills: ${skills.join(', ')}

Include:
- 3 technical questions related to their coursework
- 2 coding/problem-solving questions
- 2 behavioral questions specific to the role
- 1 system design question (if applicable)

Format each question clearly with the question type in parentheses.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600,
      temperature: 0.7,
    });

    const response = completion.choices[0].message?.content || 'No response generated';

    // Save to database
    const client = await pool.connect();
    
    const userResult = await client.query(
      'SELECT id FROM users WHERE firebase_uid = $1',
      [firebaseUid]
    );

    if (userResult.rows.length > 0) {
      await client.query(
        `INSERT INTO career_advice (user_id, type, prompt, response)
         VALUES ($1, 'interview', $2, $3)`,
        [userResult.rows[0].id, prompt, response]
      );
    }

    client.release();

    res.json({
      success: true,
      data: {
        type: 'interview',
        response,
        createdAt: new Date()
      }
    });
  } catch (error) {
    logger.error('Error generating interview prep:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate interview preparation'
    });
  }
});

// Get certification recommendations
router.post('/certifications', authenticate, async (req: Request, res: Response) => {
  try {
    if (!openai) {
      return res.status(503).json({
        success: false,
        error: 'AI service is not configured. Please configure OpenAI API key.'
      });
    }

    const { major, courses, targetJob } = req.body;
    const firebaseUid = req.user!.uid;

    const prompt = `Recommend 5 relevant certifications for someone with this profile targeting a ${targetJob} role:

Major: ${major}
Completed courses: ${courses.join(', ')}
Target role: ${targetJob}

For each certification, provide:
- Certification name and provider
- Why it's relevant for ${targetJob}
- Estimated time to complete
- Difficulty level
- Priority (High/Medium/Low)

Format as a numbered list with clear sections for each certification.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 700,
      temperature: 0.7,
    });

    const response = completion.choices[0].message?.content || 'No response generated';

    // Save to database
    const client = await pool.connect();
    
    const userResult = await client.query(
      'SELECT id FROM users WHERE firebase_uid = $1',
      [firebaseUid]
    );

    if (userResult.rows.length > 0) {
      await client.query(
        `INSERT INTO career_advice (user_id, type, prompt, response)
         VALUES ($1, 'certification', $2, $3)`,
        [userResult.rows[0].id, prompt, response]
      );
    }

    client.release();

    res.json({
      success: true,
      data: {
        type: 'certification',
        response,
        createdAt: new Date()
      }
    });
  } catch (error) {
    logger.error('Error generating certification recommendations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate certification recommendations'
    });
  }
});

// Get AI assistance history
router.get('/history', authenticate, async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user!.uid;
    const client = await pool.connect();
    
    const userResult = await client.query(
      'SELECT id FROM users WHERE firebase_uid = $1',
      [firebaseUid]
    );

    if (userResult.rows.length === 0) {
      client.release();
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const result = await client.query(
      `SELECT * FROM career_advice 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 50`,
      [userResult.rows[0].id]
    );

    client.release();

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    logger.error('Error fetching AI history:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
