
import { Tables } from "../types";

export type BlogPost = Tables<"blog_posts">;
export type BlogCategory = Tables<"blog_categories">;
export type BlogTag = Tables<"blog_tags">;

export interface BlogPostWithTags extends BlogPost {
  tags: BlogTag[];
}

export interface BlogPostWithDetails extends BlogPost {
  tags: BlogTag[];
  category_details?: BlogCategory;
}
