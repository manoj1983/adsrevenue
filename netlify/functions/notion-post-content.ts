// notion-post-content.ts
import type { Handler } from "@netlify/functions";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md"; 

export const handler: Handler = async (event) => {
    // 💡 URL से pageId या slug Fetch करें
    const postId = event.queryStringParameters?.id; 

    if (!postId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing post ID" }),
        };
    }

    try {
        const token = process.env.VITE_NOTION_TOKEN;
        if (!token) {
            throw new Error("Missing Notion token");
        }

        const notion = new Client({ auth: token });
        const n2m = new NotionToMarkdown({ notionClient: notion }); 

        // ⚠️ केवल उस एक पोस्ट का content Fetch और Convert करें
        const mdblocks = await n2m.pageToMarkdown(postId); 
        const mdString = n2m.toMarkdownString(mdblocks).parent; 
        
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: mdString }),
        };

    } catch (err: any) {
        console.error("❌ Single Post Content Error:", err);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: err.message }),
        };
    }
};
