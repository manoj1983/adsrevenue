import type { Handler } from "@netlify/functions";
import { Client } from "@notionhq/client";

export const handler: Handler = async () => {
  try {
    // ✅ Initialize Notion client with token
    const notion = new Client({ auth: process.env.VITE_NOTION_TOKEN });
    const databaseId = process.env.VITE_NOTION_DATABASE_ID;

    if (!notion || !databaseId) {
      throw new Error("Missing Notion token or database ID in environment variables");
    }

    console.log("✅ Fetching Notion posts from:", databaseId);

    // ✅ Fetch posts
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });

    // ✅ Parse posts safely
    const posts = response.results.map((page: any) => ({
      id: page.id,
      title: page.properties?.Name?.title?.[0]?.plain_text || "Untitled",
      slug:
        page.properties?.Slug?.rich_text?.[0]?.plain_text ||
        page.id.slice(0, 8),
      content:
        page.properties?.Content?.rich_text
          ?.map((t: any) => t.plain_text)
          .join(" ") || "",
      image:
        page.properties?.Image?.files?.[0]?.file?.url ||
        page.properties?.Image?.url ||
        "",
      date: page.created_time,
    }));

    // ✅ Return JSON
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(posts),
    };
  } catch (err: any) {
    console.error("❌ Server error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: err.message,
        hint: "Possible causes: Invalid token, wrong database ID, or Notion property mismatch.",
      }),
    };
  }
};
