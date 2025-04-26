import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database.types';

// Kontent va media fayllarni bog'lash
export async function linkContentMedia(
  contentType: 'page' | 'tutorial',
  contentId: string,
  mediaId: string,
  position: number = 0
) {
  try {
    const supabase = createClientComponentClient<Database>();
    
    const { error } = await supabase
      .from('content_media')
      .insert({
        content_type: contentType,
        content_id: contentId,
        media_id: mediaId,
        position,
      });

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Kontentni media fayl bilan bog\'lashda xatolik:', error);
    return { error: 'Kontentni media fayl bilan bog\'lashda xatolik yuz berdi' };
  }
}

// Kontent va media fayl bog'lanishini o'chirish
export async function unlinkContentMedia(
  contentType: 'page' | 'tutorial',
  contentId: string,
  mediaId: string
) {
  try {
    const supabase = createClientComponentClient<Database>();
    
    const { error } = await supabase
      .from('content_media')
      .delete()
      .match({
        content_type: contentType,
        content_id: contentId,
        media_id: mediaId,
      });

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Media fayl bog\'lanishini o\'chirishda xatolik:', error);
    return { error: 'Media fayl bog\'lanishini o\'chirishda xatolik yuz berdi' };
  }
}

// Kontent media fayllarini olish
export async function getContentMedia(
  contentType: 'page' | 'tutorial',
  contentId: string
) {
  try {
    const supabase = createClientComponentClient<Database>();
    
    const { data, error } = await supabase
      .from('content_media')
      .select(`
        media_id,
        position,
        media_files (
          id,
          file_name,
          original_name,
          mime_type,
          public_url
        )
      `)
      .match({
        content_type: contentType,
        content_id: contentId,
      })
      .order('position');

    if (error) throw error;
    
    return {
      data: data?.map(item => ({
        id: (item.media_files as any).id,
        fileName: (item.media_files as any).file_name,
        originalName: (item.media_files as any).original_name,
        mimeType: (item.media_files as any).mime_type,
        url: (item.media_files as any).public_url,
        position: item.position,
      })),
      error: null,
    };
  } catch (error) {
    console.error('Kontent media fayllarini olishda xatolik:', error);
    return {
      data: [],
      error: 'Kontent media fayllarini olishda xatolik yuz berdi',
    };
  }
}

// Media fayllar pozitsiyasini yangilash
export async function updateMediaPositions(
  contentType: 'page' | 'tutorial',
  contentId: string,
  positions: { mediaId: string; position: number }[]
) {
  try {
    const supabase = createClientComponentClient<Database>();
    
    // Har bir pozitsiya uchun
    for (const { mediaId, position } of positions) {
      const { error } = await supabase
        .from('content_media')
        .update({ position })
        .match({
          content_type: contentType,
          content_id: contentId,
          media_id: mediaId,
        });

      if (error) throw error;
    }

    return { error: null };
  } catch (error) {
    console.error('Media fayllar pozitsiyasini yangilashda xatolik:', error);
    return { error: 'Media fayllar pozitsiyasini yangilashda xatolik yuz berdi' };
  }
} 