import { createClient } from '@supabase/supabase-js';
import {supabaseAnonKey, supabaseUrl} from "../../config/constant";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
