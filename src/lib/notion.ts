import { Client } from "@notionhq/client";

console.log(
  "NOTION TOKEN:",
  import.meta.env.VITE_NOTION_TOKEN ? "Loaded ✅" : "Missing ❌"
);
console.log("NOTION DB:", import.meta.env.VITE_NOTION_DATABASE_ID);

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_TOKEN,
});

export async function getAllPosts() {
  const response = await notion.databases.query({
    database_id: import.meta.env.VITE_NOTION_DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return response.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Title?.title?.[0]?.plain_text || "Untitled",
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text || "",
    content: page.properties.Content?.rich_text?.[0]?.plain_text || "",
    date: page.properties.Date?.date?.start,
    image: page.properties.Image?.files?.[0]?.file?.url || "",
  }));
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug);
}
