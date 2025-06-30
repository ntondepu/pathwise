import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../config/firebase';
import { User } from '@coursepath-ai/shared';
import { api } from '../services/api';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      // Demo mode - create a mock user
      console.log('Running in demo mode - Firebase not configured');
      const demoUser: User = {
        id: 'demo-user-123',
        email: 'demo@example.com',
        displayName: 'Demo User',
        school: 'Demo University',
        major: 'Computer Science',
        graduationYear: 2026,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setUser(demoUser);
      setLoading(false);
      return;
    }

    const setupAuthListener = async () => {
      try {
        const { onAuthStateChanged } = await import('firebase/auth');
        
        const unsubscribe = onAuthStateChanged(auth!, async (firebaseUser: FirebaseUser | null) => {
          setFirebaseUser(firebaseUser);
          
          if (firebaseUser) {
            try {
              // Get or create user profile
              const token = await firebaseUser.getIdToken();
              const userProfile = await api.auth.getProfile(token);
              setUser(userProfile);
            } catch (error) {
              console.error('Error fetching user profile:', error);
              // If profile doesn't exist, we'll handle this in the registration flow
            }
          } else {
            setUser(null);
          }
          
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Failed to setup auth listener:', error);
        setLoading(false);
      }
    };

    setupAuthListener();
  }, []);

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth) {
      toast.error('Authentication not configured - running in demo mode');
      return;
    }

    try {
      setLoading(true);
      const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
      
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Get user token and register/update profile
      const token = await result.user.getIdToken();
      const userProfile = await api.auth.register({
        email: result.user.email!,
        displayName: result.user.displayName || undefined,
      }, token);
      
      setUser(userProfile);
      toast.success('Successfully signed in!');
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast.error(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!isFirebaseConfigured || !auth) {
      toast.error('Authentication not configured - running in demo mode');
      return;
    }

    try {
      setLoading(true);
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Get user profile
      const token = await result.user.getIdToken();
      const userProfile = await api.auth.getProfile(token);
      setUser(userProfile);
      
      toast.success('Successfully signed in!');
    } catch (error: any) {
      console.error('Email sign-in error:', error);
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    if (!isFirebaseConfigured || !auth) {
      toast.error('Authentication not configured - running in demo mode');
      return;
    }

    try {
      setLoading(true);
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Register user profile
      const token = await result.user.getIdToken();
      const userProfile = await api.auth.register({
        email,
        displayName,
      }, token);
      
      setUser(userProfile);
      toast.success('Account created successfully!');
    } catch (error: any) {
      console.error('Email sign-up error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (!isFirebaseConfigured || !auth) {
      // In demo mode, just clear the user
      setUser(null);
      setFirebaseUser(null);
      toast.success('Signed out successfully!');
      return;
    }

    try {
      const { signOut } = await import('firebase/auth');
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
      toast.success('Successfully signed out!');
    } catch (error: any) {
      console.error('Sign-out error:', error);
      toast.error('Failed to sign out');
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!firebaseUser) throw new Error('User not authenticated');
      
      const token = await firebaseUser.getIdToken();
      const updatedUser = await api.auth.updateProfile(data, token);
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const value: AuthContextType = {
    user,
    firebaseUser,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
