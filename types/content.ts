import { User } from '@supabase/supabase-js';

export type ContentStatus = 'draft' | 'review' | 'published';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  created_at: string;
  updated_at: string;
  parent?: Category;
  children?: Category[];
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface ContentBase {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: ContentStatus;
  category_id?: number;
  author_id: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  category?: Category;
  author?: UserProfile;
  tags?: Tag[];
}

export interface Page extends ContentBase {}

export interface Tutorial extends ContentBase {}

export interface ContentVersion {
  id: number;
  content_id: number;
  content_type: 'page' | 'tutorial';
  version: number;
  content: string;
  created_at: string;
  created_by: string;
  user?: UserProfile;
}

export interface Activity {
  id: number;
  user_id: string;
  action: string;
  title: string;
  description?: string;
  content_id?: number;
  content_type?: 'page' | 'tutorial' | 'category' | 'tag';
  created_at: string;
  user?: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  role: 'user' | 'admin' | 'editor';
  created_at: string;
  updated_at: string;
}

export interface ContentFormData {
  title: string;
  slug: string;
  content: string;
  status: ContentStatus;
  category_id?: number;
  tags?: number[];
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
}

export interface TagFormData {
  name: string;
  slug: string;
}

export type PaginatedResult<T> = {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}; 