import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import { logger } from '../utils/logger';

// Initialize Firebase Admin (if not already initialized and credentials are available)
let isFirebaseInitialized = false;

if (!admin.apps.length && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
  try {
    const serviceAccount = {
      type: 'service_account',
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    isFirebaseInitialized = true;
    logger.info('Firebase Admin initialized successfully');
  } catch (error) {
    logger.warn('Failed to initialize Firebase Admin:', error);
  }
} else {
  logger.warn('Firebase credentials not configured - authentication will be disabled');
}

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email?: string;
        name?: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // If Firebase is not initialized, skip authentication in development
    if (!isFirebaseInitialized) {
      if (process.env.NODE_ENV === 'development') {
        logger.warn('Firebase not configured - allowing request in development mode');
        req.user = {
          uid: 'dev-user-123',
          email: 'dev@example.com',
          name: 'Development User'
        };
        next();
        return;
      } else {
        res.status(500).json({
          success: false,
          error: 'Authentication service not configured'
        });
        return;
      }
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.'
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Add user info to request object
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name
    };

    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    res.status(401).json({
      success: false,
      error: 'Invalid token.'
    });
  }
};

export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // If Firebase is not initialized, skip authentication in development
    if (!isFirebaseInitialized) {
      if (process.env.NODE_ENV === 'development') {
        req.user = {
          uid: 'dev-user-123',
          email: 'dev@example.com',
          name: 'Development User'
        };
      }
      next();
      return;
    }

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name
      };
    }

    next();
  } catch (error) {
    // For optional auth, we don't return an error, just continue without user
    logger.warn('Optional authentication failed:', error);
    next();
  }
};
