
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fsrwrfyvsqwwyydbvnkd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzcndyZnl2c3F3d3l5ZGJ2bmtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5OTcxNjEsImV4cCI6MjA3ODU3MzE2MX0.5l8TDWea7K0sn4zS6gIXliAZjKKWNA-IhLFuqidrhN4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
