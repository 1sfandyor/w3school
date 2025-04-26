import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { STORAGE_CONFIG } from './storage.config';
import type { Database } from '@/types/database.types';

// Bucket yaratish
export async function createBucket(
  name: string,
  isPublic: boolean = false
): Promise<{ error: string | null }> {
  try {
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase.storage.createBucket(name, {
      public: isPublic,
      allowedMimeTypes: [
        ...STORAGE_CONFIG.ALLOWED_MIME_TYPES.IMAGES,
        ...STORAGE_CONFIG.ALLOWED_MIME_TYPES.DOCUMENTS,
        ...STORAGE_CONFIG.ALLOWED_MIME_TYPES.VIDEOS,
      ],
      fileSizeLimit: STORAGE_CONFIG.MAX_FILE_SIZE.VIDEO, // Eng katta o'lcham
    });

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Bucket yaratishda xatolik:', error);
    return { error: 'Bucket yaratishda xatolik yuz berdi' };
  }
}

// Bucket ma'lumotlarini olish
export async function getBucket(name: string) {
  try {
    const supabase = createClientComponentClient<Database>();
    const { data, error } = await supabase.storage.getBucket(name);
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Bucket ma\'lumotlarini olishda xatolik:', error);
    return { data: null, error: 'Bucket ma\'lumotlarini olishda xatolik yuz berdi' };
  }
}

// Bucketlar ro'yxatini olish
export async function listBuckets() {
  try {
    const supabase = createClientComponentClient<Database>();
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) throw error;
    return { buckets: data, error: null };
  } catch (error) {
    console.error('Bucketlar ro\'yxatini olishda xatolik:', error);
    return { buckets: [], error: 'Bucketlar ro\'yxatini olishda xatolik yuz berdi' };
  }
}

// Bucket o'chirish
export async function deleteBucket(name: string) {
  try {
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase.storage.deleteBucket(name);
    
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Bucket o\'chirishda xatolik:', error);
    return { error: 'Bucket o\'chirishda xatolik yuz berdi' };
  }
}

// Bucket mavjudligini tekshirish
export async function bucketExists(name: string): Promise<boolean> {
  try {
    const { data, error } = await getBucket(name);
    if (error || !data) return false;
    return true;
  } catch {
    return false;
  }
}

// Bucket update qilish
export async function updateBucket(
  name: string,
  options: { public: boolean; fileSizeLimit?: number }
) {
  try {
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase.storage.updateBucket(name, options);
    
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Bucket yangilashda xatolik:', error);
    return { error: 'Bucket yangilashda xatolik yuz berdi' };
  }
} 