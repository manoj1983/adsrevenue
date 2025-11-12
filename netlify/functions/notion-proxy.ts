import type { Handler } from "@netlify/functions";

// 🔹 In-memory cache (lives for ~5 minutes)
let cache: any = null;
let cacheTimestamp = 0;

export const handler: Handler = async (event, context) => {
  const now = Date.now();

  // ✅ Serve from cache if data is fresh (<5 min old)
  if (cache && now - cacheTimestamp < 5 * 60 * 1000) {
    console.log("⚡ Serving Notion data from cache");
    return {
      statusCode: 200,
      body: JSON.stringify(cache),
      headers: { "Content-Type": "application/json" },
    };
  }

  // 🔹 Fetch fresh data from Notion
  try {
    console.log("📦 Fetching fresh data from Notion...");
    const response = await fetch(
      `https://api.notion.com/v1/databases/${process.env.VITE_NOTION_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.VITE_NOTION_TOKEN}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.statusText}`);
    }

    const data = await response.json();

    // ✅ Save to cache
    cache = data;
    cacheTimestamp = now;

    console.log("✅ Notion data cached successfully");

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    console.error("❌ Notion fetch failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Notion data" }),
    };
  }
};
