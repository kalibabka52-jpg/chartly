export interface Database {
  public: {
    Tables: {
      user_progress: {
        Row: {
          id: string
          user_id: string
          course_slug: string
          lesson_slug: string
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_slug: string
          lesson_slug: string
          completed?: boolean
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          course_slug?: string
          lesson_slug?: string
          completed?: boolean
          completed_at?: string | null
        }
        Relationships: []
      }
      xp_events: {
        Row: {
          id: string
          user_id: string
          amount: number
          source: string
          source_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          source: string
          source_id: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          source?: string
          source_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          user_id: string
          display_name: string
          total_xp: number
          level: number
          streak_days: number
          last_active: string
          created_at: string
        }
        Insert: {
          user_id: string
          display_name: string
          total_xp?: number
          level?: number
          streak_days?: number
          last_active?: string
        }
        Update: {
          user_id?: string
          display_name?: string
          total_xp?: number
          level?: number
          streak_days?: number
          last_active?: string
        }
        Relationships: []
      }
      badges_earned: {
        Row: {
          id: string
          user_id: string
          badge_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          badge_id: string
        }
        Update: {
          id?: string
          user_id?: string
          badge_id?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
