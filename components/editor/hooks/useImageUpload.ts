import { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { uploadFile } from '@/lib/supabase/storage.client';
import { STORAGE_CONFIG } from '@/lib/supabase/storage.config';
import { getErrorMessage } from '@/lib/supabase/storage.utils';

interface UseImageUploadOptions {
  editor: Editor;
  onError?: (error: string) => void;
  onSuccess?: (url: string) => void;
  onProgress?: (progress: number) => void;
}

export function useImageUpload({
  editor,
  onError,
  onSuccess,
  onProgress,
}: UseImageUploadOptions) {
  // Clipboard dan rasm yuklash
  const handlePaste = useCallback(
    async (event: ClipboardEvent) => {
      const items = Array.from(event.clipboardData?.items || []);
      const imageItems = items.filter((item) => item.type.startsWith('image/'));

      if (imageItems.length === 0) return;

      event.preventDefault();

      for (const item of imageItems) {
        const file = item.getAsFile();
        if (!file) continue;

        try {
          // Fayl turini tekshirish
          const error = getErrorMessage(file);
          if (error) {
            onError?.(error);
            continue;
          }

          // Faylni yuklash
          const { url, error: uploadError } = await uploadFile(
            file,
            STORAGE_CONFIG.BUCKETS.MEDIA
          );

          if (uploadError) throw new Error(uploadError);

          // Rasmni qo'shish
          editor
            .chain()
            .focus()
            .setImage({ src: url })
            .run();

          onSuccess?.(url);
        } catch (error) {
          console.error('Rasm yuklashda xatolik:', error);
          onError?.('Rasm yuklashda xatolik yuz berdi');
        }
      }
    },
    [editor, onError, onSuccess]
  );

  // Faylni yuklash
  const uploadImage = useCallback(
    async (file: File) => {
      try {
        // Fayl turini tekshirish
        const error = getErrorMessage(file);
        if (error) {
          onError?.(error);
          return;
        }

        // Faylni yuklash
        const { url, error: uploadError } = await uploadFile(
          file,
          STORAGE_CONFIG.BUCKETS.MEDIA
        );

        if (uploadError) throw new Error(uploadError);

        // Rasmni qo'shish
        editor
          .chain()
          .focus()
          .setImage({ src: url })
          .run();

        onSuccess?.(url);
      } catch (error) {
        console.error('Rasm yuklashda xatolik:', error);
        onError?.('Rasm yuklashda xatolik yuz berdi');
      }
    },
    [editor, onError, onSuccess]
  );

  return {
    handlePaste,
    uploadImage,
  };
} 