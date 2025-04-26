import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Tutorial, ContentFormData, PaginatedResult } from '@/types/content';

// Darsliklar ro'yxatini olish
export async function getTutorials(page = 1, pageSize = 10, status?: string): Promise<PaginatedResult<Tutorial>> {
  const supabase = createClientComponentClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  
  let query = supabase
    .from('tutorials')
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
    console.error('Darsliklarni olishda xatolik:', error);
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

// Bitta darslikni olish
export async function getTutorial(id: number): Promise<Tutorial> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('tutorials')
    .select(`
      *,
      category:categories(*),
      author:profiles(*),
      tags:tutorial_tags(tag:tags(*))
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Darslikni olishda xatolik:', error);
    throw error;
  }
  
  // Teglarni formatlash
  const formattedData = {
    ...data,
    tags: data.tags ? data.tags.map((item: any) => item.tag) : []
  };
  
  return formattedData;
}

// Darslikni slug orqali olish
export async function getTutorialBySlug(slug: string): Promise<Tutorial> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('tutorials')
    .select(`
      *,
      category:categories(*),
      author:profiles(*),
      tags:tutorial_tags(tag:tags(*))
    `)
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Darslikni slug bo\'yicha olishda xatolik:', error);
    throw error;
  }
  
  // Teglarni formatlash
  const formattedData = {
    ...data,
    tags: data.tags ? data.tags.map((item: any) => item.tag) : []
  };
  
  return formattedData;
}

// Yangi darslik yaratish
export async function createTutorial(tutorialData: ContentFormData): Promise<Tutorial> {
  const supabase = createClientComponentClient();
  
  // Darslikni yaratish
  const { data: tutorial, error } = await supabase
    .from('tutorials')
    .insert({
      title: tutorialData.title,
      slug: tutorialData.slug,
      content: tutorialData.content,
      status: tutorialData.status,
      category_id: tutorialData.category_id || null,
      author_id: (await supabase.auth.getUser()).data.user?.id
    })
    .select()
    .single();
  
  if (error) {
    console.error('Darslik yaratishda xatolik:', error);
    throw error;
  }
  
  // Agar teglar berilgan bo'lsa, ularni qo'shish
  if (tutorialData.tags && tutorialData.tags.length > 0) {
    const tagInserts = tutorialData.tags.map(tag_id => ({
      tutorial_id: tutorial.id,
      tag_id
    }));
    
    const { error: tagError } = await supabase
      .from('tutorial_tags')
      .insert(tagInserts);
    
    if (tagError) {
      console.error('Teglarni qo\'shishda xatolik:', tagError);
      throw tagError;
    }
  }
  
  // Yangi versiya yaratish
  await createTutorialVersion(tutorial.id, tutorialData.content);
  
  // Faoliyat qo'shish
  await addActivity({
    action: 'create',
    title: `Darslik yaratildi: ${tutorialData.title}`,
    description: `Yangi darslik yaratildi: ${tutorialData.title}`,
    content_id: tutorial.id,
    content_type: 'tutorial'
  });
  
  return tutorial;
}

// Darslikni yangilash
export async function updateTutorial(id: number, tutorialData: ContentFormData): Promise<Tutorial> {
  const supabase = createClientComponentClient();
  
  // Darslikni olish va mavjud kontentni saqlash
  const { data: existingTutorial } = await supabase
    .from('tutorials')
    .select('content, status')
    .eq('id', id)
    .single();
    
  // Darslikni yangilash
  const { data: tutorial, error } = await supabase
    .from('tutorials')
    .update({
      title: tutorialData.title,
      slug: tutorialData.slug,
      content: tutorialData.content,
      status: tutorialData.status,
      category_id: tutorialData.category_id || null,
      updated_at: new Date().toISOString(),
      published_at: tutorialData.status === 'published' && existingTutorial?.status !== 'published' 
        ? new Date().toISOString() 
        : undefined
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Darslikni yangilashda xatolik:', error);
    throw error;
  }
  
  // Agar kontent o'zgargan bo'lsa, yangi versiya yaratish
  if (existingTutorial && existingTutorial.content !== tutorialData.content) {
    await createTutorialVersion(id, tutorialData.content);
  }
  
  // Avvalgi teglarni o'chirish
  await supabase
    .from('tutorial_tags')
    .delete()
    .eq('tutorial_id', id);
  
  // Agar teglar berilgan bo'lsa, ularni qo'shish
  if (tutorialData.tags && tutorialData.tags.length > 0) {
    const tagInserts = tutorialData.tags.map(tag_id => ({
      tutorial_id: id,
      tag_id
    }));
    
    const { error: tagError } = await supabase
      .from('tutorial_tags')
      .insert(tagInserts);
    
    if (tagError) {
      console.error('Teglarni qo\'shishda xatolik:', tagError);
      throw tagError;
    }
  }
  
  // Faoliyat qo'shish
  await addActivity({
    action: 'update',
    title: `Darslik yangilandi: ${tutorialData.title}`,
    description: `Darslik yangilandi: ${tutorialData.title}`,
    content_id: id,
    content_type: 'tutorial'
  });
  
  return tutorial;
}

// Darslikni o'chirish
export async function deleteTutorial(id: number): Promise<void> {
  const supabase = createClientComponentClient();
  
  // Darslik ma'lumotlarini olish
  const { data: tutorial } = await supabase
    .from('tutorials')
    .select('title')
    .eq('id', id)
    .single();
    
  // Darslikni o'chirish
  const { error } = await supabase
    .from('tutorials')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Darslikni o\'chirishda xatolik:', error);
    throw error;
  }
  
  // Faoliyat qo'shish
  if (tutorial) {
    await addActivity({
      action: 'delete',
      title: `Darslik o'chirildi: ${tutorial.title}`,
      description: `Darslik o'chirildi: ${tutorial.title}`,
      content_type: 'tutorial'
    });
  }
}

// Darslik versiyasini yaratish
export async function createTutorialVersion(tutorialId: number, content: string): Promise<void> {
  const supabase = createClientComponentClient();
  
  // Oxirgi versiya raqamini olish
  const { data: versions } = await supabase
    .from('content_versions')
    .select('version')
    .eq('content_id', tutorialId)
    .eq('content_type', 'tutorial')
    .order('version', { ascending: false })
    .limit(1);
  
  const nextVersion = versions && versions.length > 0 ? versions[0].version + 1 : 1;
  
  // Yangi versiya yaratish
  const { error } = await supabase
    .from('content_versions')
    .insert({
      content_id: tutorialId,
      content_type: 'tutorial',
      version: nextVersion,
      content: content,
      created_by: (await supabase.auth.getUser()).data.user?.id
    });
  
  if (error) {
    console.error('Versiya yaratishda xatolik:', error);
    throw error;
  }
}

// Darslik versiyalarini olish
export async function getTutorialVersions(tutorialId: number): Promise<any[]> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('content_versions')
    .select(`
      *,
      user:profiles(*)
    `)
    .eq('content_id', tutorialId)
    .eq('content_type', 'tutorial')
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