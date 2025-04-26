"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Pagination } from '@/components/shared/Pagination';
import { getPages } from '@/lib/api';
import { Page, ContentStatus } from '@/types/content';
import { PlusIcon, PencilIcon, TrashIcon, FilterIcon } from 'lucide-react';
import Link from 'next/link';

export default function PagesListPage() {
  // Sahifalar va pagination holati
  const [pages, setPages] = useState<Page[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ContentStatus | ''>('');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL parametrlarini olish
  useEffect(() => {
    const page = searchParams.get('page');
    const status = searchParams.get('status') as ContentStatus | null;
    
    if (page) {
      setCurrentPage(parseInt(page));
    }
    
    if (status) {
      setFilter(status);
    }
  }, [searchParams]);
  
  // Sahifalarni yuklash
  const loadPages = async () => {
    setLoading(true);
    try {
      const result = await getPages(currentPage, pageSize, filter || undefined);
      setPages(result.data);
      setTotalItems(result.count);
    } catch (error) {
      console.error('Sahifalarni yuklashda xatolik:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Sahifa o'zgarishida URL yangilash
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    
    router.push(`/admin/pages?${params.toString()}`);
    setCurrentPage(page);
  };
  
  // Filtrni o'zgartirish
  const handleFilterChange = (status: ContentStatus | '') => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    
    params.set('page', '1');
    
    router.push(`/admin/pages?${params.toString()}`);
    setFilter(status);
    setCurrentPage(1);
  };
  
  // Sahifani o'chirish
  const handleDeletePage = async (id: number) => {
    if (window.confirm('Haqiqatan ham bu sahifani o\'chirmoqchimisiz?')) {
      try {
        await fetch(`/api/pages/${id}`, {
          method: 'DELETE',
        });
        // Sahifani o'chirish muvaffaqiyatli bo'lsa, ro'yxatni yangilash
        loadPages();
      } catch (error) {
        console.error('Sahifani o\'chirishda xatolik:', error);
        alert('Sahifani o\'chirishda xatolik yuz berdi');
      }
    }
  };
  
  // Sahifa yuklanganda va parametrlar o'zgarganda sahifalarni yuklash
  useEffect(() => {
    loadPages();
  }, [currentPage, filter]);
  
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sahifalar</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-600">
                <FilterIcon className="h-4 w-4 inline mr-1" />
                Status:
              </span>
              <select
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value as ContentStatus | '')}
                className="border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Barchasi</option>
                <option value="draft">Qoralama</option>
                <option value="review">Ko'rib chiqishda</option>
                <option value="published">Nashr qilingan</option>
              </select>
            </div>
            
            <Link
              href="/admin/pages/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Yangi sahifa
            </Link>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {pages.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500 text-lg">Sahifalar mavjud emas</p>
                <p className="text-gray-400 mt-2">Yangi sahifa qo'shish uchun "Yangi sahifa" tugmasini bosing</p>
              </div>
            ) : (
              <>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {pages.map((page) => (
                      <li key={page.id}>
                        <div className="px-4 py-4 flex items-center sm:px-6">
                          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                              <div className="flex text-sm">
                                <p className="font-medium text-blue-600 truncate">{page.title}</p>
                                <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                                  <span className="mx-1">•</span>
                                  /pages/{page.slug}
                                </p>
                              </div>
                              <div className="mt-2 flex">
                                <div className="flex items-center text-sm text-gray-500">
                                  <p>
                                    {new Date(page.created_at).toLocaleDateString('uz-UZ')} •{' '}
                                    {page.author?.name || 'Anonim'}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                              <div className="flex -space-x-1 overflow-hidden">
                                <StatusBadge status={page.status} />
                              </div>
                            </div>
                          </div>
                          <div className="ml-5 flex-shrink-0 flex space-x-2">
                            <Link 
                              href={`/admin/pages/${page.id}/edit`} 
                              className="text-gray-500 hover:text-blue-600"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </Link>
                            <button
                              onClick={() => handleDeletePage(page.id)}
                              className="text-gray-500 hover:text-red-600"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalItems}
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
} 