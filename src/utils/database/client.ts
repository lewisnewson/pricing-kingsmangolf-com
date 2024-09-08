import { createClient } from "@supabase/supabase-js"

// Create a supabase client
export const supabase = createClient(
	"https://htgucagymmjxbeokzrfu.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0Z3VjYWd5bW1qeGJlb2t6cmZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0NjMzNDksImV4cCI6MjAxMTAzOTM0OX0.zH_I-15laMzJ0v5fZoTyp6wutpMH6gcW7i9QW9wIKHw"
)
