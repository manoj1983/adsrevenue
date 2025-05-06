
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BlogPostWithDetails } from "@/integrations/supabase/types/blog";

export const useBlogPost = (slug?: string) => {
  return useQuery({
    queryKey: ["blog-post", slug],
    enabled: !!slug,
    queryFn: async () => {
      try {
        if (!slug) return null;

        const { data, error } = await supabase
          .from("blog_posts")
          .select("*, blog_tags!post_tags(id, name, slug)")
          .eq("slug", slug)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        // Format the data to match our expected structure
        const formattedData: BlogPostWithDetails = {
          ...data,
          tags: data.blog_tags || []
        };

        return formattedData;
      } catch (error: any) {
        toast.error(`Error fetching blog post: ${error.message}`);
        console.error("Error fetching blog post:", error);
        return null;
      }
    },
  });
};
