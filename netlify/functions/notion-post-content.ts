// netlify/functions/notion-post-content.ts
import type { Handler } from "@netlify/functions";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md"; 

export const handler: Handler = async (event) => {
    const postId = event.queryStringParameters?.id; 
    console.log(`--- NAYA LOG: Function Shuru hui, Post ID: ${postId}`);

    if (!postId) {
        console.error("--- NAYA LOG: Error, Post ID nahi mila");
        return { statusCode: 400, body: JSON.stringify({ error: "Missing post ID" })};
    }

    try {
        const token = process.env.VITE_NOTION_TOKEN;
        if (!token) {
            console.error("--- NAYA LOG: Error, Notion Token nahi mila");
            throw new Error("Missing Notion token");
        }

        const notion = new Client({ auth: token });
        const n2m = new NotionToMarkdown({ notionClient: notion }); 

        console.log(`--- NAYA LOG: pageToMarkdown ko call kar raha hoon ${postId} ke liye`);
        const mdblocks = await n2m.pageToMarkdown(postId); 
        
        // Check karein kitne blocks mile
        console.log(`--- NAYA LOG: pageToMarkdown se ${mdblocks.length} blocks mile`);
        
        const mdStringObject = n2m.toMarkdownString(mdblocks);
        
        // Check karein ki 'parent' mein kya aaya
        console.log(`--- NAYA LOG: toMarkdownString ne 'parent' mein yeh diya: ${mdStringObject.parent}`);
        
        const content = mdStringObject.parent; // Yeh null hoga agar khaali hai, ya string hoga agar content hai

        console.log(`--- NAYA LOG: Final content jo bhej raha hoon: ${content}`);

        // Yeh hamesha {"content":null} ya {"content":"..."} bhejega
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: content }), 
        };

    } catch (err: any) {
        console.error("--- NAYA LOG: FATAL ERROR, try block fail ho gaya:", err);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: err.message }),
        };
    }
};
