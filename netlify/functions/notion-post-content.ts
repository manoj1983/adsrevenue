// netlify/functions/notion-post-content.ts
import type { Handler } from "@netlify/functions";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md"; 

export const handler: Handler = async (event) => {
    const postId = event.queryStringParameters?.id; 
    console.log(`--- LOG: Function Shuru hui, Post ID: ${postId}`);

    if (!postId) {
        return { statusCode: 400, body: JSON.stringify({ error: "Missing post ID" })};
    }

    try {
        const token = process.env.VITE_NOTION_TOKEN;
        if (!token) {
            throw new Error("Missing Notion token");
        }

        const notion = new Client({ auth: token });
        const n2m = new NotionToMarkdown({ notionClient: notion }); 

        const mdblocks = await n2m.pageToMarkdown(postId); 
        console.log(`--- LOG: pageToMarkdown se ${mdblocks.length} blocks mile`);
        
        // 💡 FIX: Hum 'toMarkdownString' ka 'parent' istemaal nahi karenge.
        // Hum seedhe har block ke 'parent' string ko join karenge.
        // Yeh tables aur doosre complex blocks ko sahi se handle karta hai.
        const content = mdblocks.map(block => block.parent).join('\n\n');

        console.log(`--- LOG: Final content bhej raha hoon: ${content ? content.slice(0, 50) + '...' : 'null'}`);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: content }), 
        };

    } catch (err: any) {
        console.error("--- LOG: FATAL ERROR:", err);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: err.message }),
        };
    }
};
