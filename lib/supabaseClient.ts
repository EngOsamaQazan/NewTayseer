// lib/supabase.ts

// استيراد دالة إنشاء عميل Supabase من مكتبة Supabase
import { createClient } from '@supabase/supabase-js';

// جلب رابط مشروع Supabase من متغيرات البيئة (يجب أن يكون معرفًا في ملف .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// جلب المفتاح العام (Anon Key) لمشروع Supabase من متغيرات البيئة
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// التحقق من وجود القيم المطلوبة، وفي حال عدم توفرها يتم إلقاء خطأ لتفادي مشاكل لاحقًا
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('عنوان مشروع Supabase أو مفتاح Anon Key غير موجود في متغيرات البيئة');
}

// إنشاء عميل Supabase باستخدام الرابط والمفتاح، ليتم استخدامه في المشروع
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 🧪 اختبار الاتصال بقاعدة البيانات عبر جدول موجود فعليًا: os_contracts
if (process.env.NODE_ENV === 'development') {
  (async () => {
    try {
      const { data, error } = await supabase
        .from('os_contracts') // اسم الجدول الموجود في قاعدة البيانات
        .select('*')
        .limit(1);

      if (error) {
        console.error('❌ فشل الاتصال بـ Supabase:', error.message);
      } else {
        console.log('✅ تم الاتصال بنجاح بـ Supabase. البيانات:', data);
      }
    } catch (err) {
      console.error('❌ حدث خطأ غير متوقع أثناء اختبار الاتصال:', err);
    }
  })();
}
