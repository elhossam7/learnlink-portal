import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ocjaxxlgbemxavmmngcf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jamF4eGxnYmVteGF2bW1uZ2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2ODQyNDAsImV4cCI6MjA0OTI2MDI0MH0.gWB-19wsA6fv7WX2RnZdDXL3I_juFBtoRItINl6NfHE';

export const supabase = createClient(supabaseUrl, supabaseKey);