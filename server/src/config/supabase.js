const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials missing. File uploads to Supabase will fail.');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

module.exports = supabase;
