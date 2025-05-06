
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BlogPostWithTags } from "@/integrations/supabase/types/blog";

export const useBlogPosts = (category?: string) => {
  return useQuery({
    queryKey: ["blog-posts", category],
    queryFn: async () => {
      try {
        let query = supabase
          .from("blog_posts")
          .select("*, blog_tags!post_tags(id, name, slug)")
          .order("published_date", { ascending: false });

        if (category && category !== "All Categories") {
          // Filter by category if one is selected
          query = query.eq("category", category);
        }

        const { data, error } = await query;

        if (error) {
          throw new Error(error.message);
        }

        // Format the data to match our expected structure
        const formattedData: BlogPostWithTags[] = data.map((post: any) => ({
          ...post,
          tags: post.blog_tags || []
        }));

        return formattedData;
      } catch (error: any) {
        toast.error(`Error fetching blog posts: ${error.message}`);
        console.error("Error fetching blog posts:", error);
        return [];
      }
    },
  });
};
