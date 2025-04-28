'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import MediaUpload from '@/components/media/MediaUpload';
import MediaGrid from '@/components/media/MediaGrid';
import { getMediaFiles } from '@/lib/api/media';
import type { Database } from '@/types/database.types';

export default function MediaPage() {
  const searchParams = useSearchParams();
  const [files, setFiles] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const type = searchParams.get('type') || undefined;
  const search = searchParams.get('search') || undefined;

  // Media fayllarni yuklash
  const loadMediaFiles = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Media fayllarni yuklashni boshlaymiz...');
      
      // Supabase mijozini yaratish
      const supabase = createClientComponentClient<Database>();
      
      try {
        // Sessiyani yangilash
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError) {
          console.error('Sessiyani yangilashda xatolik:', refreshError.message);
        } else {
          console.log('Sessiya yangilandi:', !!refreshData.session);
        }
      } catch (refreshErr) {
        console.error('refreshSession exception:', refreshErr);
      }
      
      // Sessiyani olish
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('getSession xatoligi:', sessionError.message);
      }
      
      console.log('Session bor:', !!session);
      console.log('User mavjud:', session?.user?.id);
      
      if (!session) {
        throw new Error("Avtorizatsiyadan o'tilmagan");
      }
      
      // Token olish va tekshirish
      const token = session.access_token;
      console.log('Token mavjud:', !!token);
      console.log('Token uzunligi:', token.length);
      
      console.log('API so\'rov yuborilmoqda...');

      // API so'roviga Authorization headerini qo'shish
      const response = await fetch(
        `/api/media?page=${page}&limit=${limit}${type ? `&type=${type}` : ''}${search ? `&search=${search}` : ''}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      console.log('API javob statusi:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API xatolik tafsilotlari:', errorText);
        throw new Error(`API xatolik: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      setFiles(result.data || []);
      setTotalCount(result.count || 0);
      console.log('Media fayllar muvaffaqiyatli yuklandi:', result.data?.length || 0);
    } catch (error: any) {
      console.error('Media fayllarni yuklashda xatolik:', error);
      setError(error?.message || 'Media fayllarni yuklashda xatolik yuz berdi');
    } finally {
      setIsLoading(false);
    }
  };

  // Fayl yuklanganda
  const handleUpload = async (url: string) => {
    await loadMediaFiles();
  };

  // Fayl o'chirilganda
  const handleDelete = async () => {
    await loadMediaFiles();
  };

  // Sahifa yuklanganda va filterlar o'zgarganda
  useEffect(() => {
    loadMediaFiles();
  }, [page, limit, type, search]);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Media fayllar</h1>
        <p className="mt-1 text-sm text-gray-500">
          Rasmlar, hujjatlar va boshqa media fayllarni yuklash va boshqarish
        </p>
      </div>

      {/* Yuklash komponenti */}
      <div className="mb-8">
        <MediaUpload
          onUpload={handleUpload}
          onError={(error) => setError(error)}
          maxFiles={5}
          accept={{
            'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
            'application/pdf': ['.pdf'],
          }}
        />
      </div>

      {/* Xatolik xabari */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Media fayllar */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2 text-primary">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
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
      ) : files.length > 0 ? (
        <MediaGrid files={files} onDelete={handleDelete} />
      ) : (
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed py-12">
          <p className="text-gray-500">Media fayllar mavjud emas</p>
        </div>
      )}
    </div>
  );
} 