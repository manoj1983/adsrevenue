export async function getAllPosts() {
  console.log("Fetching via Netlify Function...");

  try {
    const res = await fetch("/.netlify/functions/notion-proxy");
    const data = await res.json();

    if (!data.results) {
      console.error("Invalid Notion response:", data);
      return [];
    }

    return data.results.map((page: any) => ({
      id: page.id,
      title: page.properties.Title?.title?.[0]?.plain_text ?? "Untitled",
      slug: page.properties.Slug?.rich_text?.[0]?.plain_text ?? "",
      content: page.properties.Content?.rich_text?.[0]?.plain_text ?? "",
      date: page.properties.Date?.date?.start ?? "",
      image: page.properties.Image?.files?.[0]?.file?.url ?? "",
    }));
  } catch (error) {
    console.error("❌ Notion proxy fetch error:", error);
    return [];
  }
}
