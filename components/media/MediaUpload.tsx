'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database.types';
import { STORAGE_CONFIG } from '@/lib/supabase/storage.config';
import { getErrorMessage } from '@/lib/supabase/storage.utils';

interface MediaUploadProps {
  bucket?: string;
  path?: string;
  onUpload?: (url: string) => void;
  onError?: (error: string) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
}

export default function MediaUpload({
  bucket = STORAGE_CONFIG.BUCKETS.MEDIA,
  path = '',
  onUpload,
  onError,
  maxFiles = 1,
  accept = {
    'image/*': STORAGE_CONFIG.ALLOWED_MIME_TYPES.IMAGES,
  }
}: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setIsUploading(true);
      
      console.log('Fayl yuklashni boshlaymiz...');
      
      // Supabase mijozini yaratish
      const supabase = createClientComponentClient<Database>();
      
      try {
        // Sessiyani yangilash
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError) {
          console.error('MediaUpload - Sessiyani yangilashda xatolik:', refreshError.message);
        } else {
          console.log('MediaUpload - Sessiya yangilandi:', !!refreshData.session);
        }
      } catch (refreshErr) {
        console.error('MediaUpload - refreshSession exception:', refreshErr);
      }
      
      // Sessiyani olish va token olish
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('MediaUpload - getSession xatoligi:', sessionError.message);
      }
      
      console.log('MediaUpload - Session bor:', !!session);
      console.log('MediaUpload - User mavjud:', session?.user?.id);
      
      if (!session) {
        throw new Error("Avtorizatsiyadan o'tilmagan");
      }
      
      const token = session.access_token;
      console.log('MediaUpload - Token mavjud:', !!token);
      console.log('MediaUpload - Token uzunligi:', token.length);

      for (const file of acceptedFiles) {
        // Fayl turini tekshirish
        const error = getErrorMessage(file);
        if (error) {
          onError?.(error);
          continue;
        }

        console.log('MediaUpload - Fayl yuklanyapti:', file.name, file.type, file.size);
        
        // FormData yaratish
        const formData = new FormData();
        formData.append('file', file);
        if (path) formData.append('path', path);

        console.log('MediaUpload - API so\'rov yuborilmoqda...');
        
        // API ga auth token bilan so'rov yuborish
        const response = await fetch('/api/media', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        });

        console.log('MediaUpload - API javob statusi:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('MediaUpload - API xatolik:', errorData);
          throw new Error(errorData.error || 'Fayl yuklashda xatolik');
        }

        const { data } = await response.json();
        console.log('MediaUpload - Fayl muvaffaqiyatli yuklandi:', data);
        
        if (data?.url) {
          onUpload?.(data.url);
        }
      }
    } catch (error: any) {
      console.error('Fayl yuklashda xatolik:', error);
      onError?.(error.message || 'Fayl yuklashda kutilmagan xatolik yuz berdi');
    } finally {
      setIsUploading(false);
    }
  }, [path, onUpload, onError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept,
    disabled: isUploading,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center 
        rounded-lg border-2 border-dashed p-4 transition-colors
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
        ${isUploading ? 'cursor-not-allowed opacity-50' : 'hover:border-primary hover:bg-gray-50'}
      `}
    >
      <input {...getInputProps()} />
      
      <FiUploadCloud 
        className={`mb-4 h-10 w-10 ${isDragActive ? 'text-primary' : 'text-gray-400'}`} 
      />
      
      <div className="text-center">
        {isDragActive ? (
          <p className="text-lg font-medium text-primary">
            Faylni shu yerga tashlang
          </p>
        ) : (
          <>
            <p className="text-lg font-medium text-gray-700">
              Fayl yuklash uchun bosing yoki bu yerga tashlang
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {Object.values(accept).flat().join(', ')} formatdagi fayllar qo'llab-quvvatlanadi
            </p>
            {maxFiles > 1 && (
              <p className="mt-1 text-sm text-gray-500">
                Bir vaqtda {maxFiles} tagacha fayl yuklash mumkin
              </p>
            )}
          </>
        )}
      </div>

      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/50">
          <div className="flex items-center space-x-2 text-primary">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
              <circle 
                className="opacity-25" 
                cx="12" cy="12" r="10" 
                stroke="currentColor" 
                strokeWidth="4" 
                fill="none" 
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" 
              />
            </svg>
            <span>Yuklanmoqda...</span>
          </div>
        </div>
      )}
    </div>
  );
} 