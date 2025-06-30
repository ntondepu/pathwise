import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User as FirebaseUser,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../config/firebase';
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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
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

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
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
    try {
      setLoading(true);
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
    try {
      setLoading(true);
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
    try {
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
