import { createClient } from '@supabase/supabase-js';
import config from './index';

const { url, public_key } = config.getSupabase();

const db = createClient(url, public_key);

export default db;
