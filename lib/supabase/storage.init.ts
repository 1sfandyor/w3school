import { STORAGE_CONFIG } from './storage.config';
import { bucketExists, createBucket, updateBucket } from './storage.bucket';

// Barcha bucketlarni yaratish va konfiguratsiya qilish
export async function initializeStorage(): Promise<{ error: string | null }> {
  try {
    // Har bir bucket uchun
    for (const [bucketKey, bucketName] of Object.entries(STORAGE_CONFIG.BUCKETS)) {
      // Bucket mavjudligini tekshirish
      const exists = await bucketExists(bucketName);
      
      if (!exists) {
        // Bucket yaratish
        const { error: createError } = await createBucket(bucketName, true);
        if (createError) throw new Error(createError);
        
        console.log(`Bucket '${bucketName}' yaratildi`);
      } else {
        // Bucket sozlamalarini yangilash
        const { error: updateError } = await updateBucket(bucketName, {
          public: true,
          fileSizeLimit: STORAGE_CONFIG.MAX_FILE_SIZE.VIDEO
        });
        if (updateError) throw new Error(updateError);
        
        console.log(`Bucket '${bucketName}' yangilandi`);
      }
    }
    
    return { error: null };
  } catch (error) {
    console.error('Storage initialization xatosi:', error);
    return { 
      error: 'Storage bucketlarini sozlashda xatolik yuz berdi'
    };
  }
}

// Bucket sozlamalarini tekshirish
export async function validateStorageSetup(): Promise<{
  isValid: boolean;
  error: string | null;
}> {
  try {
    for (const bucketName of Object.values(STORAGE_CONFIG.BUCKETS)) {
      const exists = await bucketExists(bucketName);
      
      if (!exists) {
        return {
          isValid: false,
          error: `'${bucketName}' bucket mavjud emas`
        };
      }
    }
    
    return {
      isValid: true,
      error: null
    };
  } catch (error) {
    console.error('Storage tekshirishda xatolik:', error);
    return {
      isValid: false,
      error: 'Storage sozlamalarini tekshirishda xatolik yuz berdi'
    };
  }
} 