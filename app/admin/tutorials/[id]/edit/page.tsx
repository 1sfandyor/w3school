"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { getCategories, getTags, getTutorial, updateTutorial, getTutorialVersions } from '@/lib/api';
import { Category, Tag, ContentStatus, Tutorial, ContentVersion } from '@/types/content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { CalendarIcon, ClockIcon, InfoIcon } from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditTutorialPage({ params }: PageProps) {
  const tutorialId = parseInt(params.id);
  
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<ContentStatus>('draft');
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [versions, setVersions] = useState<ContentVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  
  // Darslik ma'lumotlarini yuklash
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [tutorialData, categoriesData, tagsData, versionsData] = await Promise.all([
          getTutorial(tutorialId),
          getCategories(),
          getTags(),
          getTutorialVersions(tutorialId)
        ]);
        
        setTutorial(tutorialData);
        setTitle(tutorialData.title);
        setSlug(tutorialData.slug);
        setContent(tutorialData.content);
        setStatus(tutorialData.status);
        setCategoryId(tutorialData.category_id);
        setSelectedTags(tutorialData.tags ? tutorialData.tags.map(tag => tag.id) : []);
        
        setCategories(categoriesData);
        setTags(tagsData);
        setVersions(versionsData);
      } catch (error) {
        console.error('Ma\'lumotlarni yuklashda xatolik:', error);
        setError('Darslik ma\'lumotlarini yuklashda xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [tutorialId]);
  
  // Sarlavhadan slug yaratish
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };
  
  // Darslikni saqlash
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !slug) {
      setError('Sarlavha va slug to\'ldirilishi kerak');
      return;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      await updateTutorial(tutorialId, {
        title,
        slug,
        content,
        status,
        category_id: categoryId,
        tags: selectedTags
      });
      
      router.push('/admin/tutorials');
    } catch (error: any) {
      console.error('Darslikni saqlashda xatolik:', error);
      setError(error.message || 'Darslikni saqlashda xatolik yuz berdi');
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
  
  // Versiyani tiklash
  const restoreVersion = (version: ContentVersion) => {
    if (window.confirm(`Haqiqatan ${version.version}-versiyani tiklashni xohlaysizmi?`)) {
      setContent(version.content);
    }
  };
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!tutorial) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div>
                <p className="text-sm text-red-700">Darslik topilmadi</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => router.push('/admin/tutorials')}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Darsliklar ro'yxatiga qaytish
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Darslikni tahrirlash: {tutorial.title}</h1>
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
        
        <Tabs defaultValue="edit">
          <TabsList className="mb-6">
            <TabsTrigger value="edit">Tahrirlash</TabsTrigger>
            <TabsTrigger value="versions">Versiyalar</TabsTrigger>
            <TabsTrigger value="info">Ma'lumot</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit">
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
                      Darslik URL manzili: /tutorials/{slug || 'slug-example'}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kontent
                    </label>
                    <div className="border border-gray-300 rounded-md overflow-hidden">
                      <RichTextEditor
                        roomId={`tutorial-${tutorialId}`}
                        initialContent={content}
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
                      onClick={() => router.push('/admin/tutorials')}
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
          </TabsContent>
          
          <TabsContent value="versions">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {versions.length === 0 ? (
                  <li className="px-4 py-4 sm:px-6">
                    <p className="text-sm text-gray-500">Versiyalar mavjud emas</p>
                  </li>
                ) : (
                  versions.map((version) => (
                    <li key={version.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-800">
                            Versiya {version.version}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600">
                            <CalendarIcon className="h-4 w-4 inline mr-1" />
                            {new Date(version.created_at).toLocaleDateString('uz-UZ')}{' '}
                            <ClockIcon className="h-4 w-4 inline ml-2 mr-1" />
                            {new Date(version.created_at).toLocaleTimeString('uz-UZ')}
                          </p>
                          <p className="mt-1 text-sm text-gray-600">
                            Muallif: {version.user?.name || 'Anonim'}
                          </p>
                        </div>
                        <button
                          onClick={() => restoreVersion(version)}
                          className="py-1 px-3 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Tiklash
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="info">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Darslik ma'lumotlari
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Darslik yaratilish va o'zgartirilish ma'lumotlari
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Sarlavha</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{tutorial.title}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Slug</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{tutorial.slug}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Holati</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {tutorial.status === 'published' && 'Nashr qilingan'}
                      {tutorial.status === 'review' && 'Ko\'rib chiqishda'}
                      {tutorial.status === 'draft' && 'Qoralama'}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Kategoriya</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {tutorial.category?.name || 'Kategoriyasiz'}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Yaratilgan sana</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(tutorial.created_at).toLocaleString('uz-UZ')}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">So'nggi o'zgartirilgan sana</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(tutorial.updated_at).toLocaleString('uz-UZ')}
                    </dd>
                  </div>
                  {tutorial.published_at && (
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Nashr qilingan sana</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {new Date(tutorial.published_at).toLocaleString('uz-UZ')}
                      </dd>
                    </div>
                  )}
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Muallif</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {tutorial.author?.name || 'Anonim'}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Teglar</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {tutorial.tags && tutorial.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {tutorial.tags.map((tag) => (
                            <span key={tag.id} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">Teglar yo'q</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
} 