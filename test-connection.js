// ملف لاختبار الاتصال بقاعدة البيانات Supabase

// تعيين متغيرات البيئة من ملف .env.local يدويًا
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://lscijxvmxmakwqctfdef.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzY2lqeHZteG1ha3dxY3RmZGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMDI3MjQsImV4cCI6MjA1OTc3ODcyNH0.-T8bry1x-dgKqhJyCK3vLt3pR3hTpeByxABr7kiYvXU';

// تعيين وضع التطوير
process.env.NODE_ENV = 'development';

// استيراد عميل Supabase من الملف الموجود
const { createClient } = require('@supabase/supabase-js');

// جلب رابط مشروع Supabase ومفتاح Anon من متغيرات البيئة
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// التحقق من وجود القيم المطلوبة
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('عنوان مشروع Supabase أو مفتاح Anon Key غير موجود في متغيرات البيئة');
}

// إنشاء عميل Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// اختبار الاتصال بقاعدة البيانات
console.log('🔄 جاري اختبار الاتصال بقاعدة البيانات Supabase...');

(async () => {
  try {
    const { data, error } = await supabase
      .from('os_contracts') // اسم الجدول الموجود في قاعدة البيانات
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ فشل الاتصال بـ Supabase:', error.message);
    } else {
      console.log('✅ تم الاتصال بنجاح بـ Supabase.');
      console.log('📊 البيانات المسترجعة:', data);
    }
  } catch (err) {
    console.error('❌ حدث خطأ غير متوقع أثناء اختبار الاتصال:', err);
  }
})();