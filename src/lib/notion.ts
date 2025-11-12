import { Client } from "@notionhq/client";

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_TOKEN,
});

export async function getAllPosts() {
  console.log("Fetching from Notion...");
  console.log("Database ID:", import.meta.env.VITE_NOTION_DATABASE_ID);

  try {
    const response = await notion.databases.query({
      database_id: import.meta.env.VITE_NOTION_DATABASE_ID!,
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
      sorts: [{ property: "Date", direction: "descending" }],
    });

    console.log("Notion response:", response.results);

    return response.results.map((page: any) => ({
      id: page.id,
      title: page.properties.Title?.title?.[0]?.plain_text ?? "Untitled",
      slug: page.properties.Slug?.rich_text?.[0]?.plain_text ?? "",
      content: page.properties.Content?.rich_text?.[0]?.plain_text ?? "",
      date: page.properties.Date?.date?.start ?? "",
      image: page.properties.Image?.files?.[0]?.file?.url ?? "",
    }));
  } catch (error) {
    console.error("❌ Notion fetch error:", error);
    return [];
  }
}
