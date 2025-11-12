import type { Handler } from "@netlify/functions";
import { Client } from "@notionhq/client";

export const handler: Handler = async () => {
  console.log("🔹 Netlify Function started");

  try {
    const token = process.env.VITE_NOTION_TOKEN;
    const databaseId = process.env.VITE_NOTION_DATABASE_ID;

    console.log("🔹 Token present:", !!token);
    console.log("🔹 Database ID:", databaseId);

    if (!token || !databaseId) {
      throw new Error("Missing Notion token or database ID in environment variables");
    }

    const notion = new Client({ auth: token });

    const response = await notion.databases.query({
      database_id: databaseId,
      console.log("✅ Notion response received:", JSON.stringify(response, null, 2));
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });

    console.log("🔹 Notion response count:", response.results.length);

    const posts = response.results.map((page: any) => ({
      id: page.id,
      title:
  page.properties?.Name?.title?.[0]?.plain_text ||
  page.properties?.Title?.title?.[0]?.plain_text ||
  page.properties?.["Post Title"]?.title?.[0]?.plain_text ||
  "Untitled",
      slug:
  page.properties?.Slug?.rich_text?.[0]?.plain_text ||
  (page.properties?.Name?.title?.[0]?.plain_text ||
   page.properties?.Title?.title?.[0]?.plain_text ||
   page.properties?.["Post Title"]?.title?.[0]?.plain_text ||
   page.id
  )
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, ""),
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

    console.log("✅ Posts prepared:", posts.length);

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
          "Likely causes: wrong Notion database ID, token missing, or integration not shared with DB.",
      }),
    };
  }
};
