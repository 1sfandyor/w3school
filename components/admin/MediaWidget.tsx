import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiImage, FiFile, FiArrowRight } from 'react-icons/fi';
import { getMediaFiles } from '@/lib/api/media';

export default function MediaWidget() {
  const [recentFiles, setRecentFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // So'nggi media fayllarni yuklash
  useEffect(() => {
    const loadRecentFiles = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error } = await getMediaFiles({
          limit: 5,
        });

        if (error) throw new Error(error);
        setRecentFiles(data || []);
      } catch (error) {
        console.error('Media fayllarni yuklashda xatolik:', error);
        setError('Media fayllarni yuklashda xatolik yuz berdi');
      } finally {
        setIsLoading(false);
      }
    };

    loadRecentFiles();
  }, []);

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">So'nggi media fayllar</h2>
        <Link
          href="/admin/media"
          className="flex items-center text-sm text-primary hover:text-primary/80"
        >
          <span>Barchasi</span>
          <FiArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
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
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      ) : recentFiles.length > 0 ? (
        <div className="space-y-4">
          {recentFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center space-x-4 rounded-lg border p-3 hover:bg-gray-50"
            >
              {/* Fayl preview */}
              {file.mime_type.startsWith('image/') ? (
                <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                  <Image
                    src={file.public_url}
                    alt={file.file_name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                  <FiFile className="h-6 w-6 text-gray-400" />
                </div>
              )}

              {/* Fayl ma'lumotlari */}
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">
                  {file.file_name}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(file.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-lg border-2 border-dashed py-8">
          <div className="text-center">
            <FiImage className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Media fayllar mavjud emas</p>
          </div>
        </div>
      )}
    </div>
  );
} 