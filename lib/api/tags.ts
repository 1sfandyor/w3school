import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Tag, TagFormData } from '@/types/content';

// Barcha teglarni olish
export async function getTags(): Promise<Tag[]> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Teglarni olishda xatolik:', error);
    throw error;
  }
  
  return data || [];
}

// Bitta tegni olish
export async function getTag(id: number): Promise<Tag> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Tegni olishda xatolik:', error);
    throw error;
  }
  
  return data;
}

// Yangi teg yaratish
export async function createTag(tagData: TagFormData): Promise<Tag> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('tags')
    .insert({
      name: tagData.name,
      slug: tagData.slug
    })
    .select()
    .single();
  
  if (error) {
    console.error('Teg yaratishda xatolik:', error);
    throw error;
  }
  
  // Faoliyat qo'shish
  await addActivity({
    action: 'create',
    title: `Teg yaratildi: ${tagData.name}`,
    description: `Yangi teg yaratildi: ${tagData.name}`,
    content_id: data.id,
    content_type: 'tag'
  });
  
  return data;
}

// Tegni yangilash
export async function updateTag(id: number, tagData: TagFormData): Promise<Tag> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('tags')
    .update({
      name: tagData.name,
      slug: tagData.slug
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Tegni yangilashda xatolik:', error);
    throw error;
  }
  
  // Faoliyat qo'shish
  await addActivity({
    action: 'update',
    title: `Teg yangilandi: ${tagData.name}`,
    description: `Teg yangilandi: ${tagData.name}`,
    content_id: id,
    content_type: 'tag'
  });
  
  return data;
}

// Tegni o'chirish
export async function deleteTag(id: number): Promise<void> {
  const supabase = createClientComponentClient();
  
  // Teg ma'lumotlarini olish
  const { data: tag } = await supabase
    .from('tags')
    .select('name')
    .eq('id', id)
    .single();
  
  // Tegni o'chirish
  const { error } = await supabase
    .from('tags')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Tegni o\'chirishda xatolik:', error);
    throw error;
  }
  
  // Faoliyat qo'shish
  if (tag) {
    await addActivity({
      action: 'delete',
      title: `Teg o'chirildi: ${tag.name}`,
      description: `Teg o'chirildi: ${tag.name}`,
      content_type: 'tag'
    });
  }
}

// Teg foydalanilgan sahifalar va darsliklarni olish
export async function getTagUsage(id: number): Promise<{pages: number, tutorials: number}> {
  const supabase = createClientComponentClient();
  
  // Sahifalar sonini olish
  const { count: pagesCount, error: pagesError } = await supabase
    .from('page_tags')
    .select('*', { count: 'exact', head: true })
    .eq('tag_id', id);
  
  if (pagesError) {
    console.error('Teg foydalanilgan sahifalarni olishda xatolik:', pagesError);
    throw pagesError;
  }
  
  // Darsliklar sonini olish
  const { count: tutorialsCount, error: tutorialsError } = await supabase
    .from('tutorial_tags')
    .select('*', { count: 'exact', head: true })
    .eq('tag_id', id);
  
  if (tutorialsError) {
    console.error('Teg foydalanilgan darsliklarni olishda xatolik:', tutorialsError);
    throw tutorialsError;
  }
  
  return {
    pages: pagesCount || 0,
    tutorials: tutorialsCount || 0
  };
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