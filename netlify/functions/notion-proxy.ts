// notion-proxy.ts (केवल लिस्टिंग के लिए)
import type { Handler } from "@netlify/functions";
import { Client } from "@notionhq/client";

// ... (Post interface और अन्य Imports unchanged)

export const handler: Handler = async () => {
    // ... (Token and Database ID check)

    try {
        const token = process.env.VITE_NOTION_TOKEN;
        const databaseId = process.env.VITE_NOTION_DATABASE_ID;
        if (!token || !databaseId) {
            throw new Error("Missing Notion token or database ID...");
        }

        const notion = new Client({ auth: token });

        // केवल मेटाडेटा Fetch करें
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [
                {
                    property: "Date",
                    direction: "descending",
                },
            ],
            // 💡 फ़िल्टर: केवल "Published" पोस्ट दिखाएँ (यदि आपने Notion में "Published" Checkbox property बनाई है)
            // filters: {
            //     property: "Published",
            //     checkbox: { equals: true }
            // }
        });

        console.log("✅ Raw Notion DB response count:", response.results.length);

        // Map the results from Notion into the posts format (बिना content के)
        const posts = response.results.map((page: any) => {
            const title = page.properties?.Title?.title?.[0]?.plain_text || "Untitled";
            const slug = 
                page.properties?.Slug?.rich_text?.[0]?.plain_text || 
                title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
            
            // ⚠️ content को यहाँ खाली स्ट्रिंग छोड़ दें, क्योंकि हमने इसे Fetch नहीं किया है।
            const content = ""; 

            const image =
                page.properties?.Image?.files?.[0]?.file?.url ||
                page.properties?.Image?.files?.[0]?.external?.url ||
                "";

            const date = page.properties?.Date?.date?.start || page.created_time;

            return {
                id: page.id,
                title,
                slug,
                content, // 👈 Empty string now
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
        // ... (Error handling)
    }
};
