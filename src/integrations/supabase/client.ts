import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fkmpfidmczhxxksplnqa.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrbXBmaWRtY3poeHhrc3BsbnFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4Mzk5ODQsImV4cCI6MjA0OTQxNTk4NH0._z0-nfLl1drvHetoNuB8-ZPYqPYiQ79V3vTfBojRwcw";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);