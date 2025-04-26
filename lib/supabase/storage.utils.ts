import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { STORAGE_CONFIG } from './storage.config';
import type { Database } from '@/types/database.types';

// Fayl turini tekshirish
export function isAllowedFileType(file: File, type: 'IMAGES' | 'DOCUMENTS' | 'VIDEOS'): boolean {
  return STORAGE_CONFIG.ALLOWED_MIME_TYPES[type].includes(file.type);
}

// Fayl hajmini tekshirish
export function isAllowedFileSize(file: File, type: 'IMAGE' | 'DOCUMENT' | 'VIDEO'): boolean {
  return file.size <= STORAGE_CONFIG.MAX_FILE_SIZE[type];
}

// Fayl nomini generatsiya qilish
export function generateFileName(file: File): string {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = file.name.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
}

// Fayl URL ni olish
export function getFileUrl(bucket: string, filePath: string): string {
  const supabase = createClientComponentClient<Database>();
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}

// Fayl turini aniqlash
export function getFileType(file: File): 'IMAGE' | 'DOCUMENT' | 'VIDEO' | null {
  if (STORAGE_CONFIG.ALLOWED_MIME_TYPES.IMAGES.includes(file.type)) return 'IMAGE';
  if (STORAGE_CONFIG.ALLOWED_MIME_TYPES.DOCUMENTS.includes(file.type)) return 'DOCUMENT';
  if (STORAGE_CONFIG.ALLOWED_MIME_TYPES.VIDEOS.includes(file.type)) return 'VIDEO';
  return null;
}

// Xatolik xabarlarini generatsiya qilish
export function getErrorMessage(file: File): string | null {
  const fileType = getFileType(file);
  if (!fileType) {
    return 'Fayl turi qo\'llab-quvvatlanmaydi';
  }
  
  if (!isAllowedFileSize(file, fileType)) {
    const maxSize = STORAGE_CONFIG.MAX_FILE_SIZE[fileType] / (1024 * 1024);
    return `Fayl hajmi ${maxSize}MB dan oshmasligi kerak`;
  }
  
  return null;
} 