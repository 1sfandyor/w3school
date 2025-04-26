import { useState } from 'react';
import { FiImage, FiX } from 'react-icons/fi';
import { Editor } from '@tiptap/react';
import MediaUpload from '@/components/media/MediaUpload';
import MediaGrid from '@/components/media/MediaGrid';
import { getMediaFiles } from '@/lib/api/media';

interface MediaButtonProps {
  editor: Editor;
}

export default function MediaButton({ editor }: MediaButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'library'>('upload');
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Media kutubxonasini yuklash
  const loadMediaLibrary = async () => {
    try {
      setIsLoading(true);
      const { data } = await getMediaFiles({
        type: 'image',
        limit: 20,
      });
      setFiles(data || []);
    } catch (error) {
      console.error('Media kutubxonasini yuklashda xatolik:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Modal ochilganda kutubxonani yuklash
  const handleOpen = () => {
    setIsOpen(true);
    if (activeTab === 'library') {
      loadMediaLibrary();
    }
  };

  // Rasm qo'shish
  const handleImageSelect = (url: string) => {
    editor
      .chain()
      .focus()
      .setImage({ src: url })
      .run();
    
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="flex items-center rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
      >
        <FiImage className="mr-2 h-4 w-4" />
        <span>Rasm qo'shish</span>
      </button>

      {/* Media modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-3xl rounded-lg bg-white p-6">
            {/* Modal header */}
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Rasm qo'shish</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded p-1 hover:bg-gray-100"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Tablar */}
            <div className="mb-6 border-b">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`border-b-2 pb-2 ${
                    activeTab === 'upload'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  Yuklash
                </button>
                <button
                  onClick={() => {
                    setActiveTab('library');
                    loadMediaLibrary();
                  }}
                  className={`border-b-2 pb-2 ${
                    activeTab === 'library'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  Kutubxona
                </button>
              </div>
            </div>

            {/* Tab content */}
            <div className="min-h-[400px]">
              {activeTab === 'upload' ? (
                <MediaUpload
                  onUpload={handleImageSelect}
                  accept={{
                    'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
                  }}
                />
              ) : (
                <div>
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
                  ) : (
                    <MediaGrid
                      files={files}
                      selectable
                      onSelect={(file) => handleImageSelect(file.url)}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 