import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Page, ContentFormData, PaginatedResult } from '@/types/content';

// Sahifalar ro'yxatini olish
export async function getPages(page = 1, pageSize = 10, status?: string): Promise<PaginatedResult<Page>> {
  const supabase = createClientComponentClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  
  let query = supabase
    .from('pages')
    .select(`
      *,
      category:categories(*),
      author:profiles(*)
    `, { count: 'exact' });
  
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range(from, to);
  
  if (error) {
    console.error('Sahifalarni olishda xatolik:', error);
    throw error;
  }
  
  return {
    data: data || [],
    count: count || 0,
    page,
    pageSize,
    hasMore: count ? from + pageSize < count : false
  };
}

// Bitta sahifani olish
export async function getPage(id: number): Promise<Page> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('pages')
    .select(`
      *,
      category:categories(*),
      author:profiles(*),
      tags:page_tags(tag:tags(*))
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Sahifani olishda xatolik:', error);
    throw error;
  }
  
  // Teglarni formatlash
  const formattedData = {
    ...data,
    tags: data.tags ? data.tags.map((item: any) => item.tag) : []
  };
  
  return formattedData;
}

// Sahifani slug orqali olish
export async function getPageBySlug(slug: string): Promise<Page> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('pages')
    .select(`
      *,
      category:categories(*),
      author:profiles(*),
      tags:page_tags(tag:tags(*))
    `)
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Sahifani slug bo\'yicha olishda xatolik:', error);
    throw error;
  }
  
  // Teglarni formatlash
  const formattedData = {
    ...data,
    tags: data.tags ? data.tags.map((item: any) => item.tag) : []
  };
  
  return formattedData;
}

// Yangi sahifa yaratish
export async function createPage(pageData: ContentFormData): Promise<Page> {
  const supabase = createClientComponentClient();
  
  // Sahifani yaratish
  const { data: page, error } = await supabase
    .from('pages')
    .insert({
      title: pageData.title,
      slug: pageData.slug,
      content: pageData.content,
      status: pageData.status,
      category_id: pageData.category_id || null,
      author_id: (await supabase.auth.getUser()).data.user?.id
    })
    .select()
    .single();
  
  if (error) {
    console.error('Sahifa yaratishda xatolik:', error);
    throw error;
  }
  
  // Agar teglar berilgan bo'lsa, ularni qo'shish
  if (pageData.tags && pageData.tags.length > 0) {
    const tagInserts = pageData.tags.map(tag_id => ({
      page_id: page.id,
      tag_id
    }));
    
    const { error: tagError } = await supabase
      .from('page_tags')
      .insert(tagInserts);
    
    if (tagError) {
      console.error('Teglarni qo\'shishda xatolik:', tagError);
      throw tagError;
    }
  }
  
  // Yangi versiya yaratish
  await createPageVersion(page.id, pageData.content);
  
  // Faoliyat qo'shish
  await addActivity({
    action: 'create',
    title: `Sahifa yaratildi: ${pageData.title}`,
    description: `Yangi sahifa yaratildi: ${pageData.title}`,
    content_id: page.id,
    content_type: 'page'
  });
  
  return page;
}

// Sahifani yangilash
export async function updatePage(id: number, pageData: ContentFormData): Promise<Page> {
  const supabase = createClientComponentClient();
  
  // Sahifani olish va mavjud kontentni saqlash
  const { data: existingPage } = await supabase
    .from('pages')
    .select('content, status')
    .eq('id', id)
    .single();
    
  // Sahifani yangilash
  const { data: page, error } = await supabase
    .from('pages')
    .update({
      title: pageData.title,
      slug: pageData.slug,
      content: pageData.content,
      status: pageData.status,
      category_id: pageData.category_id || null,
      updated_at: new Date().toISOString(),
      published_at: pageData.status === 'published' && existingPage?.status !== 'published' 
        ? new Date().toISOString() 
        : undefined
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Sahifani yangilashda xatolik:', error);
    throw error;
  }
  
  // Agar kontent o'zgargan bo'lsa, yangi versiya yaratish
  if (existingPage && existingPage.content !== pageData.content) {
    await createPageVersion(id, pageData.content);
  }
  
  // Avvalgi teglarni o'chirish
  await supabase
    .from('page_tags')
    .delete()
    .eq('page_id', id);
  
  // Agar teglar berilgan bo'lsa, ularni qo'shish
  if (pageData.tags && pageData.tags.length > 0) {
    const tagInserts = pageData.tags.map(tag_id => ({
      page_id: id,
      tag_id
    }));
    
    const { error: tagError } = await supabase
      .from('page_tags')
      .insert(tagInserts);
    
    if (tagError) {
      console.error('Teglarni qo\'shishda xatolik:', tagError);
      throw tagError;
    }
  }
  
  // Faoliyat qo'shish
  await addActivity({
    action: 'update',
    title: `Sahifa yangilandi: ${pageData.title}`,
    description: `Sahifa yangilandi: ${pageData.title}`,
    content_id: id,
    content_type: 'page'
  });
  
  return page;
}

// Sahifani o'chirish
export async function deletePage(id: number): Promise<void> {
  const supabase = createClientComponentClient();
  
  // Sahifa ma'lumotlarini olish
  const { data: page } = await supabase
    .from('pages')
    .select('title')
    .eq('id', id)
    .single();
    
  // Sahifani o'chirish
  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Sahifani o\'chirishda xatolik:', error);
    throw error;
  }
  
  // Faoliyat qo'shish
  if (page) {
    await addActivity({
      action: 'delete',
      title: `Sahifa o'chirildi: ${page.title}`,
      description: `Sahifa o'chirildi: ${page.title}`,
      content_type: 'page'
    });
  }
}

// Sahifa versiyasini yaratish
export async function createPageVersion(pageId: number, content: string): Promise<void> {
  const supabase = createClientComponentClient();
  
  // Oxirgi versiya raqamini olish
  const { data: versions } = await supabase
    .from('content_versions')
    .select('version')
    .eq('content_id', pageId)
    .eq('content_type', 'page')
    .order('version', { ascending: false })
    .limit(1);
  
  const nextVersion = versions && versions.length > 0 ? versions[0].version + 1 : 1;
  
  // Yangi versiya yaratish
  const { error } = await supabase
    .from('content_versions')
    .insert({
      content_id: pageId,
      content_type: 'page',
      version: nextVersion,
      content: content,
      created_by: (await supabase.auth.getUser()).data.user?.id
    });
  
  if (error) {
    console.error('Versiya yaratishda xatolik:', error);
    throw error;
  }
}

// Sahifa versiyalarini olish
export async function getPageVersions(pageId: number): Promise<any[]> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('content_versions')
    .select(`
      *,
      user:profiles(*)
    `)
    .eq('content_id', pageId)
    .eq('content_type', 'page')
    .order('version', { ascending: false });
  
  if (error) {
    console.error('Versiyalarni olishda xatolik:', error);
    throw error;
  }
  
  return data || [];
}

// Faoliyat qo'shish
async function addActivity(activityData: {
  action: string;
  title: string;
  description?: string;
  content_id?: number;
  content_type?: 'page' | 'tutorial' | 'category' | 'tag';
}): Promise<void> {
  const supabase = createClientComponentClient();
  
  const { error } = await supabase
    .from('activities')
    .insert({
      user_id: (await supabase.auth.getUser()).data.user?.id,
      action: activityData.action,
      title: activityData.title,
      description: activityData.description,
      content_id: activityData.content_id,
      content_type: activityData.content_type
    });
  
  if (error) {
    console.error('Faoliyatni qo\'shishda xatolik:', error);
    // Bu xatolikni tizim ishlashiga ta'sir qilmasligi uchun e'tiborsiz qoldiramiz
  }
} 