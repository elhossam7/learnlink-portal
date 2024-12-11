import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fkmpfidmczhxxksplnqa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrbXBmaWRtY3poeHhrc3BsbnFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc2NjY5ODAsImV4cCI6MjAyMzI0Mjk4MH0.ZpDVR4iKEXj9Qz4TxEYJQkLxXZhQfH_IpfAFTDGDYtc';

export const supabase = createClient(supabaseUrl, supabaseKey);