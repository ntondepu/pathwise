import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Check if Firebase credentials are configured
const isFirebaseConfigured = !!(
  firebaseConfig.apiKey && 
  firebaseConfig.authDomain && 
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'your-api-key-here' &&
  firebaseConfig.apiKey.length > 10 // Basic validation for real API key
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

const initializeFirebase = async () => {
  if (isFirebaseConfigured) {
    try {
      // Dynamically import Firebase modules only when needed
      const { initializeApp } = await import('firebase/app');
      const { getAuth } = await import('firebase/auth');
      const { getFirestore } = await import('firebase/firestore');
      
      // Initialize Firebase
      app = initializeApp(firebaseConfig);
      
      // Initialize Firebase Authentication and get a reference to the service
      auth = getAuth(app);
      
      // Initialize Cloud Firestore and get a reference to the service
      db = getFirestore(app);
      
      console.log('Firebase initialized successfully');
    } catch (error) {
      console.warn('Failed to initialize Firebase:', error);
    }
  } else {
    console.warn('Firebase credentials not configured - running in demo mode');
  }
};

// Initialize Firebase only if configured
if (isFirebaseConfigured) {
  initializeFirebase();
}

export { auth, db, isFirebaseConfigured };
export default app;
