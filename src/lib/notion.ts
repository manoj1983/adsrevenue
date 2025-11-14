// src/lib/notion.ts

// 💡 1. 'try...catch' hata diya gaya hai.
// Ab agar koi error (jaise 404) aayegi, toh React Query use pakad lega.
export const getAllPosts = async () => {
  console.log("Fetching via Netlify Function...");
  const response = await fetch("/.netlify/functions/notion-proxy");

  if (!response.ok) {
    console.error("❌ Notion proxy fetch failed:", response.status);
    // 💡 Error ko 'throw' karein (taaki React Query ise pakad sake)
    throw new Error(`Notion proxy fetch failed: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("✅ Raw Notion data:", data);

  // ✅ Validate response
  if (!Array.isArray(data)) {
    console.error("❌ Invalid response: Not an array");
    throw new Error("Invalid response: Not an array");
  }

  // ✅ Filter only posts with title + slug
  const validPosts = data.filter(
    (p) => p.title && p.slug && p.title !== "Untitled"
  );

  console.log("✅ Notion posts fetched:", validPosts);
  console.log("🟢 Total posts:", validPosts.length);

  return validPosts;
};
