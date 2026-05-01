/// <reference types="vite/client" />

declare module '@/clients/supabase.js' {
  import type { SupabaseClient } from '@supabase/supabase-js'

  export const supabase: SupabaseClient
}
