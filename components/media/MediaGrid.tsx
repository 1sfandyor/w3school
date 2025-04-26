import { useState } from 'react';
import Image from 'next/image';
import { FiTrash2, FiDownload, FiCopy } from 'react-icons/fi';
import { deleteFile } from '@/lib/supabase/storage.client';

interface MediaFile {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  bucket: string;
  path: string;
}

interface MediaGridProps {
  files: MediaFile[];
  onDelete?: (file: MediaFile) => void;
  onSelect?: (file: MediaFile) => void;
  selectable?: boolean;
}

export default function MediaGrid({
  files,
  onDelete,
  onSelect,
  selectable = false,
}: MediaGridProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Fayl hajmini formatlash
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  // Faylni o'chirish
  const handleDelete = async (file: MediaFile) => {
    try {
      const { error } = await deleteFile(file.bucket, file.path);
      if (error) throw error;
      onDelete?.(file);
    } catch (error) {
      console.error('Faylni o\'chirishda xatolik:', error);
    }
  };

  // URL ni clipboard ga nusxalash
  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error('URL ni nusxalashda xatolik:', error);
    }
  };

  // Faylni tanlash
  const handleSelect = (file: MediaFile) => {
    setSelectedFile(file.id);
    onSelect?.(file);
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {files.map((file) => (
        <div
          key={file.id}
          className={`
            group relative overflow-hidden rounded-lg border bg-white shadow-sm
            ${selectable ? 'cursor-pointer' : ''}
            ${selectedFile === file.id ? 'ring-2 ring-primary' : ''}
          `}
          onClick={() => selectable && handleSelect(file)}
        >
          {/* Fayl preview */}
          <div className="aspect-square">
            {file.type.startsWith('image/') ? (
              <Image
                src={file.url}
                alt={file.name}
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100 p-4">
                <span className="text-sm text-gray-500">{file.type}</span>
              </div>
            )}
          </div>

          {/* Fayl ma'lumotlari */}
          <div className="p-2">
            <p className="truncate text-sm font-medium text-gray-700">
              {file.name}
            </p>
            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
          </div>

          {/* Amallar paneli */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            {/* Yuklash */}
            <a
              href={file.url}
              download
              className="rounded-full bg-white p-2 text-gray-700 hover:bg-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <FiDownload className="h-4 w-4" />
            </a>

            {/* URL ni nusxalash */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopyUrl(file.url);
              }}
              className="rounded-full bg-white p-2 text-gray-700 hover:bg-gray-100"
            >
              <FiCopy className="h-4 w-4" />
            </button>

            {/* O'chirish */}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(file);
                }}
                className="rounded-full bg-white p-2 text-red-600 hover:bg-red-50"
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 