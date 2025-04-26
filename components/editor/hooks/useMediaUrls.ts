import { useCallback, useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import { getMediaFiles } from '@/lib/api/media';

interface UseMediaUrlsOptions {
  editor: Editor;
  onError?: (error: string) => void;
}

export function useMediaUrls({ editor, onError }: UseMediaUrlsOptions) {
  const [urls, setUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Kontentdagi barcha rasmlarni topish
  const findImages = useCallback(() => {
    const images: string[] = [];
    editor.state.doc.descendants((node) => {
      if (node.type.name === 'image' && node.attrs.src) {
        images.push(node.attrs.src);
      }
    });
    return images;
  }, [editor]);

  // Media fayllarni yuklash
  const loadMediaFiles = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data, error } = await getMediaFiles({
        type: 'image',
        limit: 100,
      });

      if (error) throw new Error(error);

      const mediaUrls = data?.map((file) => file.public_url) || [];
      setUrls(mediaUrls);
    } catch (error) {
      console.error('Media fayllarni yuklashda xatolik:', error);
      onError?.('Media fayllarni yuklashda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  }, [onError]);

  // URL ni tekshirish
  const isValidUrl = useCallback((url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, []);

  // URL ni yangilash
  const updateImageUrl = useCallback(
    (oldUrl: string, newUrl: string) => {
      if (!isValidUrl(newUrl)) {
        onError?.("Noto'g'ri URL formati");
        return;
      }

      editor.state.doc.descendants((node, pos) => {
        if (
          node.type.name === 'image' &&
          node.attrs.src === oldUrl
        ) {
          editor
            .chain()
            .setNodeSelection(pos)
            .updateAttributes('image', { src: newUrl })
            .run();
        }
      });
    },
    [editor, isValidUrl, onError]
  );

  // Kontentdagi rasmlarni kuzatish
  useEffect(() => {
    const images = findImages();
    if (images.length > 0 && urls.length === 0) {
      loadMediaFiles();
    }
  }, [findImages, urls.length, loadMediaFiles]);

  return {
    urls,
    isLoading,
    findImages,
    updateImageUrl,
    loadMediaFiles,
  };
} 