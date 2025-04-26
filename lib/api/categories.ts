import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Category, CategoryFormData } from '@/types/content';

// Barcha kategoriyalarni olish
export async function getCategories(): Promise<Category[]> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Kategoriyalarni olishda xatolik:', error);
    throw error;
  }
  
  return data || [];
}

// Kategoriyalarni daraxtsimon tuzilishda olish
export async function getCategoriesTree(): Promise<Category[]> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Kategoriyalarni olishda xatolik:', error);
    throw error;
  }
  
  // Daraxtsimon tuzilishni yaratish
  const categories = data || [];
  const categoryMap = new Map<number, Category>();
  const rootCategories: Category[] = [];
  
  // Barcha kategoriyalarni map ga joylashtirish
  categories.forEach(category => {
    categoryMap.set(category.id, { ...category, children: [] });
  });
  
  // Daraxtni yaratish
  categories.forEach(category => {
    const categoryWithChildren = categoryMap.get(category.id);
    
    if (category.parent_id) {
      // Agar parent_id mavjud bo'lsa, bu kategoriyanining ota-kategoriyasi bor
      const parentCategory = categoryMap.get(category.parent_id);
      if (parentCategory) {
        if (!parentCategory.children) {
          parentCategory.children = [];
        }
        parentCategory.children.push(categoryWithChildren!);
      } else {
        // Agar ota-kategoriya topilmasa, asosiy ro'yxatga qo'shish
        rootCategories.push(categoryWithChildren!);
      }
    } else {
      // Agar parent_id bo'lmasa, bu asosiy (root) kategoriya
      rootCategories.push(categoryWithChildren!);
    }
  });
  
  return rootCategories;
}

// Bitta kategoriyani olish
export async function getCategory(id: number): Promise<Category> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('categories')
    .select(`
      *,
      parent:categories(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Kategoriyani olishda xatolik:', error);
    throw error;
  }
  
  return data;
}

// Yangi kategoriya yaratish
export async function createCategory(categoryData: CategoryFormData): Promise<Category> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('categories')
    .insert({
      name: categoryData.name,
      slug: categoryData.slug,
      description: categoryData.description,
      parent_id: categoryData.parent_id || null
    })
    .select()
    .single();
  
  if (error) {
    console.error('Kategoriya yaratishda xatolik:', error);
    throw error;
  }
  
  // Faoliyat qo'shish
  await addActivity({
    action: 'create',
    title: `Kategoriya yaratildi: ${categoryData.name}`,
    description: `Yangi kategoriya yaratildi: ${categoryData.name}`,
    content_id: data.id,
    content_type: 'category'
  });
  
  return data;
}

// Kategoriyani yangilash
export async function updateCategory(id: number, categoryData: CategoryFormData): Promise<Category> {
  const supabase = createClientComponentClient();
  
  // O'zini o'ziga ota qilmasligini tekshirish
  if (categoryData.parent_id === id) {
    throw new Error('Kategoriya o\'zini ota kategoriya sifatida tanlay olmaydi');
  }
  
  // Siklik bog'lanishlarni tekshirish
  if (categoryData.parent_id) {
    const hasCycle = await checkCyclicDependency(id, categoryData.parent_id);
    if (hasCycle) {
      throw new Error('Siklik bog\'lanish aniqlandi. Bu kategoriya zanjiri allaqachon shu kategoriyaga bog\'langan');
    }
  }
  
  const { data, error } = await supabase
    .from('categories')
    .update({
      name: categoryData.name,
      slug: categoryData.slug,
      description: categoryData.description,
      parent_id: categoryData.parent_id || null
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Kategoriyani yangilashda xatolik:', error);
    throw error;
  }
  
  // Faoliyat qo'shish
  await addActivity({
    action: 'update',
    title: `Kategoriya yangilandi: ${categoryData.name}`,
    description: `Kategoriya yangilandi: ${categoryData.name}`,
    content_id: id,
    content_type: 'category'
  });
  
  return data;
}

// Kategoriyani o'chirish
export async function deleteCategory(id: number): Promise<void> {
  const supabase = createClientComponentClient();
  
  // Kategoriya ma'lumotlarini olish
  const { data: category } = await supabase
    .from('categories')
    .select('name')
    .eq('id', id)
    .single();
  
  // Kategoriyani o'chirish
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Kategoriyani o\'chirishda xatolik:', error);
    throw error;
  }
  
  // Faoliyat qo'shish
  if (category) {
    await addActivity({
      action: 'delete',
      title: `Kategoriya o'chirildi: ${category.name}`,
      description: `Kategoriya o'chirildi: ${category.name}`,
      content_type: 'category'
    });
  }
}

// Siklik bog'lanishlarni tekshirish uchun rekursiv funksiya
async function checkCyclicDependency(categoryId: number, parentId: number): Promise<boolean> {
  if (categoryId === parentId) {
    return true;
  }
  
  const supabase = createClientComponentClient();
  
  const { data } = await supabase
    .from('categories')
    .select('parent_id')
    .eq('id', parentId)
    .single();
  
  if (!data || !data.parent_id) {
    return false;
  }
  
  return checkCyclicDependency(categoryId, data.parent_id);
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