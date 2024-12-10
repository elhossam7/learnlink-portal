import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ocjaxxlgbemxavmmngcf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jamF4eGxnYmVteGF2bW1uZ2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjI0MTcsImV4cCI6MjAyNTM5ODQxN30.vhkEVCZG_Qe5X4JLCxLvO2ybKH_MkFkwNpd_q6c0WXE';

export const supabase = createClient(supabaseUrl, supabaseKey);