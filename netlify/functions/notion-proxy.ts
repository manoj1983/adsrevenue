// netlify/functions/notion-proxy.ts
import type { Handler } from "@netlify/functions";
import { Client } from "@notionhq/client";

// Define the structure of a post object (Metadata only)
interface PostMetadata {
  id: string;
  title: string;
  slug: string;
  image: string;
  date: string;
}

export const handler: Handler = async () => {
  console.log("🔹 Netlify Function (Metadata List) started");

  try {
    const token = process.env.VITE_NOTION_TOKEN;
    const databaseId = process.env.VITE_NOTION_DATABASE_ID;

    if (!token || !databaseId) {
      throw new Error("Missing Notion token or database ID");
    }

    const notion = new Client({ auth: token });

    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
      // Optional: Add a filter to only fetch published posts
      // filter: {
      //   property: "Published", // Assuming you have a checkbox property named "Published"
      //   checkbox: {
      //     equals: true,
      //   },
      // },
    });

    console.log("✅ Raw Notion DB response count:", response.results.length);

    const posts: PostMetadata[] = response.results.map((page: any) => {
      const title =
        page.properties?.Title?.title?.[0]?.plain_text || "Untitled";

      const slug =
        page.properties?.Slug?.rich_text?.[0]?.plain_text ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

      const image =
        page.properties?.Image?.files?.[0]?.file?.url ||
        page.properties?.Image?.files?.[0]?.external?.url ||
        "";

      const date = page.properties?.Date?.date?.start || page.created_time;

      return {
        id: page.id, // 👈 ID भेजना बहुत ज़रूरी है
        title,
        slug,
        image,
        date,
        // ⚠️ ध्यान दें: हम यहाँ 'content' नहीं भेज रहे हैं
      };
    });

    console.log("✅ Prepared posts (metadata only):", posts.length);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(posts),
    };
  } catch (err: any) {
    console.error("❌ Notion Proxy (Metadata) Error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
