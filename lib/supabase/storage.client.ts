import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { STORAGE_CONFIG } from './storage.config';
import { generateFileName, getErrorMessage, getFileType } from './storage.utils';
import type { Database } from '@/types/database.types';

// Storage client yaratish
const createStorageClient = () => {
  const supabase = createClientComponentClient<Database>();
  return supabase.storage;
};

// Fayl yuklash
export async function uploadFile(
  file: File,
  bucket: string,
  path: string = ''
): Promise<{ url: string; error: string | null }> {
  try {
    // Fayl turini tekshirish
    const errorMessage = getErrorMessage(file);
    if (errorMessage) {
      return { url: '', error: errorMessage };
    }

    const storage = createStorageClient();
    const fileName = generateFileName(file);
    const filePath = path ? `${path}/${fileName}` : fileName;

    // Faylni yuklash
    const { error: uploadError } = await storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // Fayl URL ni olish
    const { data } = storage.from(bucket).getPublicUrl(filePath);
    
    return {
      url: data.publicUrl,
      error: null
    };
  } catch (error) {
    console.error('Fayl yuklashda xatolik:', error);
    return {
      url: '',
      error: 'Fayl yuklashda xatolik yuz berdi'
    };
  }
}

// Faylni o'chirish
export async function deleteFile(
  bucket: string,
  path: string
): Promise<{ error: string | null }> {
  try {
    const storage = createStorageClient();
    const { error: deleteError } = await storage
      .from(bucket)
      .remove([path]);

    if (deleteError) {
      throw deleteError;
    }

    return { error: null };
  } catch (error) {
    console.error('Faylni o\'chirishda xatolik:', error);
    return {
      error: 'Faylni o\'chirishda xatolik yuz berdi'
    };
  }
}

// Fayllarni ro'yxatini olish
export async function listFiles(
  bucket: string,
  path: string = ''
): Promise<{ files: string[]; error: string | null }> {
  try {
    const storage = createStorageClient();
    const { data, error: listError } = await storage
      .from(bucket)
      .list(path);

    if (listError) {
      throw listError;
    }

    return {
      files: data.map(file => file.name),
      error: null
    };
  } catch (error) {
    console.error('Fayllar ro\'yxatini olishda xatolik:', error);
    return {
      files: [],
      error: 'Fayllar ro\'yxatini olishda xatolik yuz berdi'
    };
  }
} 