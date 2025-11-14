// notion-proxy.ts
import type { Handler } from "@netlify/functions";
import { Client } from "@notionhq/client";
// 👈 n2m को Import करें
import { NotionToMarkdown } from "notion-to-md"; 

// Define the structure of a post object for better type safety
interface Post {
    id: string;
    title: string;
    slug: string;
    // content अब Markdown स्ट्रिंग होगी
    content: string; 
    image: string;
    date: string;
}

// -----------------------------------------------------------
// 📄 fetchAndConvertPostContent फ़ंक्शन जोड़ें 
// -----------------------------------------------------------
/**
 * यह फ़ंक्शन Notion Page ID लेता है, उसके blocks को Fetch करता है 
 * और उन्हें Markdown में बदलता है।
 */
const fetchAndConvertPostContent = async (notion: Client, pageId: string): Promise<string> => {
    // n2m को initialize करें
    const n2m = new NotionToMarkdown({ notionClient: notion }); 
    
    // Page blocks को retrieve करें
    const mdblocks = await n2m.pageToMarkdown(pageId); 
    
    // Markdown blocks को एक सिंगल स्ट्रिंग में कन्वर्ट करें
    const mdString = n2m.toMarkdownString(mdblocks).parent; 
    
    return mdString;
};
// -----------------------------------------------------------


export const handler: Handler = async () => {
    console.log("🔹 Netlify Function started");

    try {
        // Get the Notion token and database ID from environment variables
        const token = process.env.VITE_NOTION_TOKEN;
        const databaseId = process.env.VITE_NOTION_DATABASE_ID;

        // Check if the token and database ID exist, throw an error if missing
        if (!token || !databaseId) {
            throw new Error("Missing Notion token or database ID in environment variables");
        }

        // Initialize the Notion client with the token
        const notion = new Client({ auth: token });

        // Query the Notion database for posts, sorted by Date in descending order
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [
                {
                    property: "Date",
                    direction: "descending",
                },
            ],
            // Content property को यहाँ से हटा दें, क्योंकि हम इसे बाद में blocks API से Fetch करेंगे।
            // या सुनिश्चित करें कि आपके Notion DB में Content नाम की कोई Rich Text property नहीं है 
            // क्योंकि हम अब Full Page Content blocks से Markdown generate कर रहे हैं।
            // यदि आपके पास केवल Metadata properties हैं (Title, Slug, Image, Date), तो यह 
            // ठीक से काम करेगा।
        });

        console.log("✅ Raw Notion DB response count:", response.results.length);

        // Fetch content for all posts concurrently
        const postsPromises = response.results.map(async (page: any) => {
            const title =
                page.properties?.Title?.title?.[0]?.plain_text || "Untitled";

            const slug =
                page.properties?.Slug?.rich_text?.[0]?.plain_text ||
                title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)+/g, "");

            // ⚠️ Full post content को Fetch और Convert करने के लिए fetchAndConvertPostContent का उपयोग करें
            const content = await fetchAndConvertPostContent(notion, page.id); 

            const image =
                page.properties?.Image?.files?.[0]?.file?.url ||
                page.properties?.Image?.files?.[0]?.external?.url ||
                "";

            const date = page.properties?.Date?.date?.start || page.created_time;

            return {
                id: page.id,
                title,
                slug,
                content, // यह अब सही Markdown स्ट्रिंग है
                image,
                date,
            };
        });

        // सभी posts का content Fetch होने का इंतजार करें
        const posts: Post[] = await Promise.all(postsPromises); 

        console.log("✅ Prepared posts:", posts.length);

        // Return the posts as a JSON response
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
                hint: "Check Notion token/database sharing or property names (Title, Slug, Date, Content, Image, Published).",
            }),
        };
    }
};
