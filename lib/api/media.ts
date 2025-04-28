import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

// Media fayl yuklash
export async function uploadMedia(file: File, path: string = '', customSupabase?: SupabaseClient) {
  try {
    // Agar tashqaridan client berilgan bo'lsa, shuni ishlatamiz
    const supabase = customSupabase || createClientComponentClient<Database>();
    
    // Fayl nomini generatsiya qilish
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const filePath = path ? `${path}/${fileName}` : fileName;
    
    // Faylni storage ga yuklash
    const { data: storageData, error: storageError } = await supabase
      .storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (storageError) throw storageError;
    
    // Public URL olish
    const { data: { publicUrl } } = supabase
      .storage
      .from('media')
      .getPublicUrl(filePath);
    
    // Media jadvaliga ma'lumot saqlash
    const { data: mediaData, error: mediaError } = await supabase
      .from('media')
      .insert({
        file_name: fileName,
        original_name: file.name,
        size: file.size,
        mime_type: file.type,
        path: filePath,
        url: publicUrl,
        file_type: getFileType(file.type)
      })
      .select('*')
      .single();
    
    if (mediaError) throw mediaError;
    
    return { data: mediaData, error: null };
  } catch (error: any) {
    console.error('Media yuklashda xatolik:', error);
    return { data: null, error: error.message || 'Media yuklashda xatolik yuz berdi' };
  }
}

// Media faylni o'chirish
export async function deleteMedia(id: string, customSupabase?: SupabaseClient) {
  try {
    // Agar tashqaridan client berilgan bo'lsa, shuni ishlatamiz
    const supabase = customSupabase || createClientComponentClient<Database>();
    
    // Fayl ma'lumotlarini olish
    const { data: media, error: fetchError } = await supabase
      .from('media')
      .select('*')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    if (!media) throw new Error('Media fayl topilmadi');
    
    // Storage dan faylni o'chirish
    const { error: storageError } = await supabase
      .storage
      .from('media')
      .remove([media.path]);
    
    if (storageError) throw storageError;
    
    // Ma'lumotlar bazasidan ma'lumotni o'chirish
    const { error: deleteError } = await supabase
      .from('media')
      .delete()
      .eq('id', id);
    
    if (deleteError) throw deleteError;
    
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Media faylni o\'chirishda xatolik:', error);
    return { success: false, error: error.message || 'Media faylni o\'chirishda xatolik yuz berdi' };
  }
}

// Media fayllar ro'yxatini olish
export async function getMediaFiles({
  page = 1,
  limit = 20,
  type,
  search
}: {
  page?: number;
  limit?: number;
  type?: string;
  search?: string;
}, customSupabase?: SupabaseClient) {
  try {
    // Agar tashqaridan client berilgan bo'lsa, shuni ishlatamiz
    const supabase = customSupabase || createClientComponentClient<Database>();
    
    // Offset hisoblash
    const offset = (page - 1) * limit;
    
    // Asosiy so'rov
    let query = supabase
      .from('media')
      .select('*', { count: 'exact' });
    
    // Filter qo'shish: Fayl turi bo'yicha
    if (type) {
      query = query.eq('file_type', type);
    }
    
    // Filter qo'shish: Qidiruv so'rovi bo'yicha
    if (search) {
      query = query.or(`original_name.ilike.%${search}%,file_name.ilike.%${search}%`);
    }
    
    // Tartib va sahifalash qo'shish
    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    
    return { data, count, error: null };
  } catch (error: any) {
    console.error('Media fayllar ro\'yxatini olishda xatolik:', error);
    return { 
      data: [], 
      count: 0, 
      error: error.message || 'Media fayllar ro\'yxatini olishda xatolik yuz berdi' 
    };
  }
}

// Media fayl ma'lumotlarini yangilash
export async function updateMedia(id: string, updates: any, customSupabase?: SupabaseClient) {
  try {
    // Agar tashqaridan client berilgan bo'lsa, shuni ishlatamiz
    const supabase = customSupabase || createClientComponentClient<Database>();
    
    // Ma'lumotlarni yangilash
    const { data, error } = await supabase
      .from('media')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Media ma\'lumotlarini yangilashda xatolik:', error);
    return { 
      data: null, 
      error: error.message || 'Media ma\'lumotlarini yangilashda xatolik yuz berdi' 
    };
  }
}

// Fayl turini aniqlash funksiyasi
function getFileType(mimeType: string): string {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.includes('pdf')) return 'document';
  return 'other';
} 