import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database.types';
import { uploadFile, deleteFile } from '@/lib/supabase/storage.client';

// Media fayl yuklash
export async function uploadMedia(file: File, path: string = '') {
  try {
    const supabase = createClientComponentClient<Database>();
    
    // Faylni storage ga yuklash
    const { url, error: uploadError } = await uploadFile(file, 'media', path);
    if (uploadError) throw new Error(uploadError);

    // Media fayl ma'lumotlarini bazaga saqlash
    const { data: mediaFile, error: dbError } = await supabase
      .from('media_files')
      .insert({
        file_name: file.name,
        original_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        bucket_name: 'media',
        file_path: path,
        public_url: url,
      })
      .select()
      .single();

    if (dbError) throw dbError;
    return { data: mediaFile, error: null };
  } catch (error) {
    console.error('Media fayl yuklashda xatolik:', error);
    return { data: null, error: 'Media fayl yuklashda xatolik yuz berdi' };
  }
}

// Media faylni o'chirish
export async function deleteMedia(id: string) {
  try {
    const supabase = createClientComponentClient<Database>();
    
    // Fayl ma'lumotlarini olish
    const { data: mediaFile, error: fetchError } = await supabase
      .from('media_files')
      .select()
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    if (!mediaFile) throw new Error('Media fayl topilmadi');

    // Storage dan o'chirish
    const { error: storageError } = await deleteFile(
      mediaFile.bucket_name,
      mediaFile.file_path
    );
    if (storageError) throw new Error(storageError);

    // Bazadan o'chirish
    const { error: dbError } = await supabase
      .from('media_files')
      .delete()
      .eq('id', id);
    
    if (dbError) throw dbError;
    return { error: null };
  } catch (error) {
    console.error('Media faylni o\'chirishda xatolik:', error);
    return { error: 'Media faylni o\'chirishda xatolik yuz berdi' };
  }
}

// Media fayllar ro'yxatini olish
export async function getMediaFiles(options: {
  page?: number;
  limit?: number;
  type?: string;
  search?: string;
} = {}) {
  try {
    const {
      page = 1,
      limit = 20,
      type,
      search,
    } = options;

    const supabase = createClientComponentClient<Database>();

    // Get current user's profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .single();

    // Build query
    let query = supabase
      .from('media_files')
      .select('*', { count: 'exact' });

    // Fayl turi bo'yicha filtrlash
    if (type) {
      query = query.like('mime_type', `${type}%`);
    }

    // Qidiruv
    if (search) {
      query = query.or(`original_name.ilike.%${search}%,file_name.ilike.%${search}%`);
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;
    
    return {
      data,
      count,
      error: null,
    };
  } catch (error) {
    console.error('Media fayllar ro\'yxatini olishda xatolik:', error);
    return {
      data: [],
      count: 0,
      error: 'Media fayllar ro\'yxatini olishda xatolik yuz berdi',
    };
  }
}

// Media fayl ma'lumotlarini yangilash
export async function updateMedia(
  id: string,
  updates: {
    file_name?: string;
    metadata?: Record<string, any>;
    status?: 'active' | 'archived' | 'deleted';
  }
) {
  try {
    const supabase = createClientComponentClient<Database>();
    
    const { data, error } = await supabase
      .from('media_files')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Media fayl ma\'lumotlarini yangilashda xatolik:', error);
    return {
      data: null,
      error: 'Media fayl ma\'lumotlarini yangilashda xatolik yuz berdi',
    };
  }
} 