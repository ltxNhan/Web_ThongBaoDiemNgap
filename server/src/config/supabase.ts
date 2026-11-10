import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import path from 'path';

// Nạp file .env trong thư mục server/ bất kể CWD đang chạy (root hoặc server/).
// Nhờ đó server luôn đọc SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY từ server/.env.
config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Dùng service_role key để bypass RLS, phù hợp background worker & admin API.
// Nếu chưa cấu hình .env, supabaseAdmin = null; các Repository thật sẽ fallback sang
// vùng giả lập (in-memory) thay vì crash.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseServiceKey);

if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ CẢNH BÁO: SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY chưa được cấu hình trong .env.',
  );
}



export const supabaseAdmin =
  isSupabaseConfigured && supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : null;
