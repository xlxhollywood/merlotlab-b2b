import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://dcncthzfsjsusyugdrjn.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjbmN0aHpmc2pzdXN5dWdkcmpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MjEwNDcsImV4cCI6MjA2ODM5NzA0N30.sbfdBIIlqsyfrb854TR42-Ze3iscC2ECm5qB3mr88mA"

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface LocationData {
  id: string
  category: string
  place_name: string
  image_urls: string[]
  description: string | null
  korean_name: string
}
