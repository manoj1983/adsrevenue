import type { Handler } from "@netlify/functions";
import { Client } from "@notionhq/client";

export const handler: Handler = async () => {
  console.log("🔹 Netlify Function started");

  try {
    const token = process.env.VITE_NOTION_TOKEN;
    const databaseId = process.env.VITE_NOTION_DATABASE_ID;

    if (!token || !databaseId) {
      throw new Error("Missing Notion token or database ID in environment variables");
    }

    const notion = new Client({ auth: token });

    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: "Date", direction: "descending" }],
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
    });

    console.log("✅ Raw Notion DB response count:", response.results.length);

    const posts = response.results.map((page: any) => {
      const title =
        page.properties?.Title?.title?.[0]?.plain_text || "Untitled";

      const slug =
        page.properties?.Slug?.rich_text?.[0]?.plain_text ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

      const content =
        page.properties?.Content?.rich_text
          ?.map((t: any) => t.plain_text)
          .join(" ") || "";

      const image =
        page.properties?.Image?.files?.[0]?.file?.url ||
        page.properties?.Image?.files?.[0]?.external?.url ||
        "";

      const date =
        page.properties?.Date?.date?.start || page.created_time;

      return {
        id: page.id,
        title,
        slug,
        content,
        image,
        date,
      };
    });

    console.log("✅ Prepared posts:", posts.length);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(posts),
    };
  } catch (err: any) {
    console.error("❌ Notion Proxy Fatal Error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: err.message,
        hint:
          "Check Notion token/database sharing or property names (Title, Slug, Date, Content, Image, Published).",
      }),
    };
  }
};
