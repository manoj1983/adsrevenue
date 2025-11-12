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
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    });

    console.log("✅ Raw Notion DB response count:", response.results.length);

    const posts = await Promise.all(
      response.results.map(async (page: any) => {
        const title =
          page.properties?.Name?.title?.[0]?.plain_text ||
          page.properties?.Title?.title?.[0]?.plain_text ||
          page.properties?.["Post Title"]?.title?.[0]?.plain_text ||
          "Untitled";

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

        // ✅ Fetch the page content directly (not from a Notion property)
        let content = "";
        try {
          const blocks = await notion.blocks.children.list({ block_id: page.id });
          content = blocks.results
            .map((block: any) => {
              if (block.type === "paragraph") {
                return block.paragraph.rich_text.map((t: any) => t.plain_text).join(" ");
              }
              if (block.type === "heading_2") {
                return `## ${block.heading_2.rich_text
                  .map((t: any) => t.plain_text)
                  .join(" ")}`;
              }
              if (block.type === "heading_3") {
                return `### ${block.heading_3.rich_text
                  .map((t: any) => t.plain_text)
                  .join(" ")}`;
              }
              if (block.type === "quote") {
                return `> ${block.quote.rich_text.map((t: any) => t.plain_text).join(" ")}`;
              }
              if (block.type === "bulleted_list_item") {
                return `- ${block.bulleted_list_item.rich_text
                  .map((t: any) => t.plain_text)
                  .join(" ")}`;
              }
              if (block.type === "image") {
                const img =
                  block.image.file?.url || block.image.external?.url || "";
                return `![image](${img})`;
              }
              return "";
            })
            .join("\n\n");
        } catch (err) {
          console.warn(`⚠️ Could not fetch content for page: ${title}`);
        }

        return {
          id: page.id,
          title,
          slug,
          content,
          image,
          date: page.created_time,
        };
      })
    );

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
          "Check Notion token/database sharing or property names (Name, Slug, Image).",
      }),
    };
  }
};
