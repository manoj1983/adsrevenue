
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BlogCategory } from "@/integrations/supabase/types/blog";

export const useCategories = () => {
  return useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("blog_categories")
          .select("*")
          .order("name");

        if (error) {
          throw new Error(error.message);
        }

        return ["All Categories", ...data.map((category: BlogCategory) => category.name)];
      } catch (error: any) {
        toast.error(`Error fetching categories: ${error.message}`);
        console.error("Error fetching categories:", error);
        return ["All Categories"];
      }
    },
  });
};
