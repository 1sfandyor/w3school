"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { getCategories, getTags, createPage } from '@/lib/api';
import { Category, Tag, ContentStatus } from '@/types/content';
import { randomUUID } from 'crypto';

export default function NewPagePage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<ContentStatus>('draft');
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const roomId = randomUUID();
  
  // Kategoriyalar va teglarni yuklash
  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, tagsData] = await Promise.all([
          getCategories(),
          getTags()
        ]);
        
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Ma\'lumotlarni yuklashda xatolik:', error);
        setError('Kategoriyalar va teglarni yuklashda xatolik yuz berdi');
      }
    };
    
    loadData();
  }, []);
  
  // Sarlavhadan slug yaratish
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Avtomatik slug yaratish
    const newSlug = newTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Maxsus belgilarni olib tashlash
      .replace(/\s+/g, '-') // Bo'shliqlarni chiziqcha bilan almashtirish
      .replace(/-+/g, '-'); // Ketma-ket chiziqchalarni yagona chiziqcha bilan almashtirish
    
    setSlug(newSlug);
  };
  
  // Sahifani saqlash
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !slug) {
      setError('Sarlavha va slug to\'ldirilishi kerak');
      return;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      await createPage({
        title,
        slug,
        content,
        status,
        category_id: categoryId,
        tags: selectedTags
      });
      
      router.push('/admin/pages');
    } catch (error: any) {
      console.error('Sahifani saqlashda xatolik:', error);
      setError(error.message || 'Sahifani saqlashda xatolik yuz berdi');
      setSaving(false);
    }
  };
  
  // Kontentni yangilash
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };
  
  // Teglarni boshqarish
  const handleTagToggle = (tagId: number) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Yangi sahifa</h1>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Sarlavha
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Sahifa URL manzili: /pages/{slug || 'slug-example'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kontent
                </label>
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  <RichTextEditor
                    roomId={roomId}
                    initialContent=""
                    onSave={handleContentChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ContentStatus)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="draft">Qoralama</option>
                  <option value="review">Ko'rib chiqishda</option>
                  <option value="published">Nashr qilingan</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Kategoriya
                </label>
                <select
                  id="category"
                  name="category"
                  value={categoryId || ''}
                  onChange={(e) => setCategoryId(e.target.value ? parseInt(e.target.value) : undefined)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Kategoriyasiz</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">
                  Teglar
                </span>
                <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-300 rounded-md p-3">
                  {tags.length === 0 ? (
                    <p className="text-sm text-gray-500">Teglar mavjud emas</p>
                  ) : (
                    tags.map((tag) => (
                      <div key={tag.id} className="flex items-center">
                        <input
                          id={`tag-${tag.id}`}
                          type="checkbox"
                          checked={selectedTags.includes(tag.id)}
                          onChange={() => handleTagToggle(tag.id)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`tag-${tag.id}`}
                          className="ml-3 block text-sm text-gray-700"
                        >
                          {tag.name}
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.push('/admin/pages')}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                >
                  {saving ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
} 