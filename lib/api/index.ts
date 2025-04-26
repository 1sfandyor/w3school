// Sahifalar API
export * from './pages';

// Darsliklar API
export * from './tutorials';

// Kategoriyalar API
export * from './categories';

// Teglar API
export * from './tags';

// Utilities
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database.types';

/**
 * So'nggi faoliyatlarni olish
 * @param limit - Maksimal faoliyatlar soni (default: 5)
 * @returns - Faoliyatlar ro'yxati
 */
export async function getRecentActivities(limit = 5) {
  const supabase = createClientComponentClient<Database>();
  
  try {
    // Activities jadvalidan ma'lumotlarni olish
    const { data: activitiesData, error: activitiesError } = await supabase
      .from('activities')
      .select(`
        id,
        user_id,
        action,
        title,
        description,
        created_at
      `)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (activitiesError) {
      console.error('So\'nggi faoliyatlarni olishda xatolik:', activitiesError);
      return [];
    }
    
    // Agar ma'lumotlar bo'lmasa, bo'sh massiv qaytaramiz
    if (!activitiesData || activitiesData.length === 0) {
      return [];
    }
    
    // Foydalanuvchi ma'lumotlarini olish
    const userIds = activitiesData
      .filter(activity => activity.user_id)
      .map(activity => activity.user_id);
    
    if (userIds.length > 0) {
      // Unique foydalanuvchi ID larini olish
      const uniqueUserIds = Array.from(new Set(userIds));
      
      // Foydalanuvchi ma'lumotlarini profiles jadvalidan olish
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .in('id', uniqueUserIds);
        
      if (usersError) {
        console.error('Foydalanuvchi ma\'lumotlarini olishda xatolik:', usersError);
        // Foydalanuvchi ma'lumotlarini qo'shmasdan qaytarish
        return activitiesData;
      } 
      
      if (usersData) {
        // Har bir faoliyatga foydalanuvchi ma'lumotlarini qo'shish
        return activitiesData.map(activity => {
          const user = usersData.find(user => user.id === activity.user_id);
          return {
            ...activity,
            user: user || null
          };
        });
      }
    }
    
    // Foydalanuvchi ma'lumotlarini qo'shmasdan qaytarish
    return activitiesData;
  } catch (error) {
    console.error('So\'nggi faoliyatlarni olishda kutilmagan xatolik:', error);
    return [];
  }
}

/**
 * Dashboard uchun umumiy statistikani olish
 * @returns - Sahifalar, darslar, foydalanuvchilar va qoralamalar soni
 */
export async function getDashboardStats() {
  const supabase = createClientComponentClient<Database>();
  
  try {
    // Sahifalar sonini olish
    const { count: pagesCount, error: pagesError } = await supabase
      .from('pages')
      .select('*', { count: 'exact', head: true });
    
    // Darslar sonini olish
    const { count: tutorialsCount, error: tutorialsError } = await supabase
      .from('tutorials')
      .select('*', { count: 'exact', head: true });
    
    // Foydalanuvchilar sonini olish - profiles jadvalidan
    // Bu jadval auth.users jadvaliga bog'langan va har bir foydalanuvchi uchun profil mavjud
    const { count: usersCount, error: usersError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    
    // Qoralamalar sonini olish (status=draft bo'lgan sahifa va darslar)
    const { count: pagesPublishedCount, error: pagesPublishedError } = await supabase
      .from('pages')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'draft');
    
    const { count: tutorialsPublishedCount, error: tutorialsPublishedError } = await supabase
      .from('tutorials')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'draft');
    
    // Xatoliklarni tekshirish
    if (pagesError || tutorialsError || usersError || pagesPublishedError || tutorialsPublishedError) {
      console.error('Statistika olishda xatolik:', {
        pagesError,
        tutorialsError,
        usersError,
        pagesPublishedError,
        tutorialsPublishedError
      });
      
      return {
        pages: 0,
        tutorials: 0,
        users: 0,
        drafts: 0,
      };
    }
    
    return {
      pages: pagesCount || 0,
      tutorials: tutorialsCount || 0,
      users: usersCount || 0,
      drafts: (pagesPublishedCount || 0) + (tutorialsPublishedCount || 0),
    };
  } catch (error) {
    console.error('Dashboard statistikasini olishda kutilmagan xatolik:', error);
    return {
      pages: 0,
      tutorials: 0,
      users: 0,
      drafts: 0,
    };
  }
} 