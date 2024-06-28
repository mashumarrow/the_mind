import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://iugkezjkrodtdxfzverc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1Z2tlemprcm9kdGR4Znp2ZXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2MzE1NjgsImV4cCI6MjAzNDIwNzU2OH0.b4cCjvU3urfWaJNZ_5dohRi1B6emQQg8vmoleFOapi4",
);