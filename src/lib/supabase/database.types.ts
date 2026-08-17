// Database types generated from Supabase schema

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
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string | null
          updated_by?: string | null
        }
      }
      homepage_content: {
        Row: {
          id: string
          section: string
          content: Json
          published: boolean | null
          display_order: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          section: string
          content: Json
          published?: boolean | null
          display_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          section?: string
          content?: Json
          published?: boolean | null
          display_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
      }
      doctors: {
        Row: {
          id: string
          slug: string
          name: string
          photo_url: string | null
          qualifications: string
          specialty: string
          designation: string | null
          roles: string[] | null
          bio: string | null
          visiting: boolean | null
          registration_body: string | null
          registration_number: string | null
          registration_year: string | null
          memberships: string[] | null
          education: Json | null
          professional_experience: string[] | null
          training: string[] | null
          areas_of_expertise: string[] | null
          seo_title: string | null
          seo_description: string | null
          og_image_url: string | null
          published: boolean | null
          display_order: number | null
          created_at: string | null
          updated_at: string | null
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          slug: string
          name: string
          photo_url?: string | null
          qualifications: string
          specialty: string
          designation?: string | null
          roles?: string[] | null
          bio?: string | null
          visiting?: boolean | null
          registration_body?: string | null
          registration_number?: string | null
          registration_year?: string | null
          memberships?: string[] | null
          education?: Json | null
          professional_experience?: string[] | null
          training?: string[] | null
          areas_of_expertise?: string[] | null
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          published?: boolean | null
          display_order?: number | null
          created_at?: string | null
          updated_at?: string | null
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          photo_url?: string | null
          qualifications?: string
          specialty?: string
          designation?: string | null
          roles?: string[] | null
          bio?: string | null
          visiting?: boolean | null
          registration_body?: string | null
          registration_number?: string | null
          registration_year?: string | null
          memberships?: string[] | null
          education?: Json | null
          professional_experience?: string[] | null
          training?: string[] | null
          areas_of_expertise?: string[] | null
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          published?: boolean | null
          display_order?: number | null
          created_at?: string | null
          updated_at?: string | null
          created_by?: string | null
          updated_by?: string | null
        }
      }
      treatments: {
        Row: {
          id: string
          slug: string
          title: string
          short_description: string | null
          hero_image_url: string | null
          content: string | null
          benefits: string[] | null
          icon: string | null
          doctor_id: string | null
          related_treatment_ids: string[] | null
          seo_title: string | null
          seo_description: string | null
          og_image_url: string | null
          published: boolean | null
          featured: boolean | null
          display_order: number | null
          created_at: string | null
          updated_at: string | null
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          short_description?: string | null
          hero_image_url?: string | null
          content?: string | null
          benefits?: string[] | null
          icon?: string | null
          doctor_id?: string | null
          related_treatment_ids?: string[] | null
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          published?: boolean | null
          featured?: boolean | null
          display_order?: number | null
          created_at?: string | null
          updated_at?: string | null
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          short_description?: string | null
          hero_image_url?: string | null
          content?: string | null
          benefits?: string[] | null
          icon?: string | null
          doctor_id?: string | null
          related_treatment_ids?: string[] | null
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          published?: boolean | null
          featured?: boolean | null
          display_order?: number | null
          created_at?: string | null
          updated_at?: string | null
          created_by?: string | null
          updated_by?: string | null
        }
      }
      dental_guides: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content: string
          cover_image_url: string | null
          category: string | null
          tags: string[] | null
          author: string | null
          related_treatment_ids: string[] | null
          seo_title: string | null
          seo_description: string | null
          og_image_url: string | null
          status: string | null
          published_at: string | null
          created_at: string | null
          updated_at: string | null
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string | null
          content: string
          cover_image_url?: string | null
          category?: string | null
          tags?: string[] | null
          author?: string | null
          related_treatment_ids?: string[] | null
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          status?: string | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          excerpt?: string | null
          content?: string
          cover_image_url?: string | null
          category?: string | null
          tags?: string[] | null
          author?: string | null
          related_treatment_ids?: string[] | null
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          status?: string | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
          created_by?: string | null
          updated_by?: string | null
        }
      }
      patient_stories: {
        Row: {
          id: string
          title: string
          story: string
          testimonial: string | null
          before_image_url: string | null
          after_image_url: string | null
          treatment_id: string | null
          doctor_id: string | null
          published: boolean | null
          display_order: number | null
          featured: boolean | null
          created_at: string | null
          updated_at: string | null
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          title: string
          story: string
          testimonial?: string | null
          before_image_url?: string | null
          after_image_url?: string | null
          treatment_id?: string | null
          doctor_id?: string | null
          published?: boolean | null
          display_order?: number | null
          featured?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          story?: string
          testimonial?: string | null
          before_image_url?: string | null
          after_image_url?: string | null
          treatment_id?: string | null
          doctor_id?: string | null
          published?: boolean | null
          display_order?: number | null
          featured?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          created_by?: string | null
          updated_by?: string | null
        }
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          category: string | null
          treatment_id: string | null
          guide_id: string | null
          published: boolean | null
          display_order: number | null
          created_at: string | null
          updated_at: string | null
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category?: string | null
          treatment_id?: string | null
          guide_id?: string | null
          published?: boolean | null
          display_order?: number | null
          created_at?: string | null
          updated_at?: string | null
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string | null
          treatment_id?: string | null
          guide_id?: string | null
          published?: boolean | null
          display_order?: number | null
          created_at?: string | null
          updated_at?: string | null
          created_by?: string | null
          updated_by?: string | null
        }
      }
      media: {
        Row: {
          id: string
          filename: string
          storage_path: string
          public_url: string
          mime_type: string
          size_bytes: number
          width: number | null
          height: number | null
          alt_text: string | null
          caption: string | null
          created_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          id?: string
          filename: string
          storage_path: string
          public_url: string
          mime_type: string
          size_bytes: number
          width?: number | null
          height?: number | null
          alt_text?: string | null
          caption?: string | null
          created_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          id?: string
          filename?: string
          storage_path?: string
          public_url?: string
          mime_type?: string
          size_bytes?: number
          width?: number | null
          height?: number | null
          alt_text?: string | null
          caption?: string | null
          created_at?: string | null
          uploaded_by?: string | null
        }
      }
    }
  }
}
