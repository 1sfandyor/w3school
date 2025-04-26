export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          id: string
          created_at: string
          user_id: string
          action: string
          title: string
          description: string | null
          entity_id: string | null
          entity_type: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          action: string
          title: string
          description?: string | null
          entity_id?: string | null
          entity_type?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          action?: string
          title?: string
          description?: string | null
          entity_id?: string | null
          entity_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          id: string
          created_at: string
          name: string
          slug: string
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          slug: string
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          slug?: string
          description?: string | null
        }
      }
      pages: {
        Row: {
          id: string
          created_at: string
          title: string
          slug: string
          content: Json
          status: string
          user_id: string
          category_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          slug: string
          content: Json
          status?: string
          user_id: string
          category_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          slug?: string
          content?: Json
          status?: string
          user_id?: string
          category_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pages_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      page_tags: {
        Row: {
          page_id: string
          tag_id: string
        }
        Insert: {
          page_id: string
          tag_id: string
        }
        Update: {
          page_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_tags_page_id_fkey"
            columns: ["page_id"]
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          id: string
          created_at: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          slug?: string
        }
      }
      tutorials: {
        Row: {
          id: string
          created_at: string
          title: string
          slug: string
          content: Json
          status: string
          user_id: string
          category_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          slug: string
          content: Json
          status?: string
          user_id: string
          category_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          slug?: string
          content?: Json
          status?: string
          user_id?: string
          category_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tutorials_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutorials_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tutorial_tags: {
        Row: {
          tutorial_id: string
          tag_id: string
        }
        Insert: {
          tutorial_id: string
          tag_id: string
        }
        Update: {
          tutorial_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutorial_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutorial_tags_tutorial_id_fkey"
            columns: ["tutorial_id"]
            referencedRelation: "tutorials"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  auth: {
    Tables: {
      users: {
        Row: {
          id: string
          role: string | null
          email: string
          raw_app_metadata: Json
          raw_user_metadata: Json
          created_at: string
        }
      }
    }
  }
} 