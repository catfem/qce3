import { User as SupabaseUser } from '@supabase/supabase-js';

export type AppUser = SupabaseUser | { isGuest: true; id: 'guest'; email?: undefined; user_metadata: { full_name: string; avatar_url?: string } };

export interface User extends SupabaseUser {}

export interface Question {
  id: string;
  content: string;
  answer: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  isPublic: boolean;
  createdAt: string;
  authorId: string;
}

export type Page = 'home' | 'my-bank' | 'open-bank' | 'dashboard' | 'settings';

export type Language = 'en' | 'zh-TW';

export type Theme = 'light' | 'dark' | 'system';