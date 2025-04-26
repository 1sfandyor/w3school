// Supabase Storage konfiguratsiyasi
export const STORAGE_CONFIG = {
  // Asosiy bucket nomlari
  BUCKETS: {
    MEDIA: 'media',          // Umumiy media fayllar uchun
    AVATARS: 'avatars',      // Foydalanuvchi rasmlari uchun
    CONTENT: 'content',      // Kontent rasmlari uchun
  },
  
  // Ruxsat etilgan fayl turlari
  ALLOWED_MIME_TYPES: {
    IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENTS: ['application/pdf'],
    VIDEOS: ['video/mp4', 'video/webm'],
  },
  
  // Fayl hajmi chegaralari (baytlarda)
  MAX_FILE_SIZE: {
    IMAGE: 5 * 1024 * 1024,     // 5MB
    DOCUMENT: 10 * 1024 * 1024, // 10MB
    VIDEO: 50 * 1024 * 1024,    // 50MB
  },
  
  // Rasm o'lchamlari
  IMAGE_SIZES: {
    THUMBNAIL: { width: 150, height: 150 },
    MEDIUM: { width: 800, height: 600 },
    LARGE: { width: 1920, height: 1080 },
  },
}; 