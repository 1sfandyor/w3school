import { useCallback, useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import { uploadFile } from '@/lib/supabase/storage.client';
import { STORAGE_CONFIG } from '@/lib/supabase/storage.config';
import { getErrorMessage } from '@/lib/supabase/storage.utils';

interface DragAndDropProps {
  editor: Editor;
  children: React.ReactNode;
}

export default function DragAndDrop({ editor, children }: DragAndDropProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Drag event handlerlar
  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Fayl tashlanganda
  const handleDrop = useCallback(
    async (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer?.files || []);
      
      // Har bir fayl uchun
      for (const file of files) {
        // Fayl turini tekshirish
        const error = getErrorMessage(file);
        if (error) {
          console.error(error);
          continue;
        }

        try {
          // Faylni yuklash
          const { url, error: uploadError } = await uploadFile(
            file,
            STORAGE_CONFIG.BUCKETS.MEDIA
          );

          if (uploadError) throw new Error(uploadError);

          // Rasm qo'shish
          if (file.type.startsWith('image/')) {
            const { state } = editor;
            const { selection } = state;
            const position = selection.$head.pos;

            editor
              .chain()
              .focus()
              .setImage({ src: url })
              .setTextSelection(position + 1)
              .run();
          }
        } catch (error) {
          console.error('Fayl yuklashda xatolik:', error);
        }
      }
    },
    [editor]
  );

  // Event listenerlarni qo'shish
  useEffect(() => {
    const element = document.querySelector('.ProseMirror');
    if (!element) return;

    element.addEventListener('dragenter', handleDragEnter as unknown as EventListener);
    element.addEventListener('dragleave', handleDragLeave as unknown as EventListener);
    element.addEventListener('dragover', handleDragOver as unknown as EventListener);
    element.addEventListener('drop', handleDrop as unknown as EventListener);

    return () => {
      element.removeEventListener('dragenter', handleDragEnter as unknown as EventListener);
      element.removeEventListener('dragleave', handleDragLeave as unknown as EventListener);
      element.removeEventListener('dragover', handleDragOver as unknown as EventListener);
      element.removeEventListener('drop', handleDrop as unknown as EventListener);
    };
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  return (
    <div className="relative">
      {children}
      
      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-dashed border-primary bg-primary/5">
          <div className="text-center">
            <p className="text-lg font-medium text-primary">
              Rasmni shu yerga tashlang
            </p>
            <p className="mt-1 text-sm text-primary/80">
              JPG, PNG, GIF formatidagi rasmlar qo'llab-quvvatlanadi
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 