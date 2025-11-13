import React, { createContext, useState, useEffect, useMemo } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import { AppUser } from '../types';

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
    }

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setError(null); // Clear errors on auth state change
        setLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  
  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(error.message);
      }
    }
    setLoading(false);
  }

  const registerWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
        if (error.message.includes('User already registered')) {
            setError('A user with this email address already exists.');
        } else {
            setError(error.message);
        }
    }
    setLoading(false);
  }

  const loginAsGuest = () => {
    setUser({
      id: 'guest',
      isGuest: true,
      user_metadata: { full_name: 'Guest User' }
    });
  }

  const logout = async () => {
    setLoading(true);
    setError(null);
    const isGuest = user && 'isGuest' in user && user.isGuest;
    if (isGuest) {
      setUser(null);
    } else {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      }
    }
    setLoading(false);
  };
  
  const value = useMemo(() => ({
    user,
    session,
    loading,
    error,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    loginAsGuest,
    logout,
  }), [user, session, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};