const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");

exports.handler = async () => {
  try {
    const token = process.env.VITE_NOTION_TOKEN;
    const databaseId = process.env.VITE_NOTION_DATABASE_ID;

    if (!token || !databaseId) {
      throw new Error("Missing Notion token or database ID.");
    }

    const notion = new Client({ auth: token });
    const n2m = new NotionToMarkdown({ notionClient: notion });

    // Fetch posts
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: "Date", direction: "descending" }],
    });

    const posts = [];

    for (const page of response.results) {
      const title =
        page.properties?.Title?.title?.[0]?.plain_text || "Untitled";

      const slug =
        page.properties?.Slug?.rich_text?.[0]?.plain_text ||
        title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      const image =
        page.properties?.Image?.files?.[0]?.file?.url ||
        page.properties?.Image?.files?.[0]?.external?.url ||
        "";

      const date =
        page.properties?.Date?.date?.start || page.created_time;

      // Convert full page → Markdown
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const markdown = n2m.toMarkdownString(mdBlocks);

      posts.push({
        id: page.id,
        title,
        slug,
        content: markdown,
        image,
        date,
      });
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(posts),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
