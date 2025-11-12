// /src/lib/notion.ts
export const getAllPosts = async () => {
  try {
    console.log("Fetching via Netlify Function...");
    const response = await fetch("/.netlify/functions/notion-proxy");

    if (!response.ok) {
      console.error("❌ Notion proxy fetch failed:", response.status);
      return [];
    }

    const data = await response.json();
    console.log("✅ Raw Notion data:", data);

    // ✅ Validate response
    if (!Array.isArray(data)) {
      console.error("❌ Invalid response: Not an array");
      return [];
    }

    // ✅ Filter only posts with title + content
    const validPosts = data.filter(
      (p) => p.title && p.content && p.slug && p.title !== "Untitled"
    );

    console.log("✅ Notion posts fetched:", validPosts);
    console.log("🟢 Total posts:", validPosts.length);

    return validPosts;
  } catch (error) {
    console.error("❌ Notion proxy fetch error:", error);
    return [];
  }
};
