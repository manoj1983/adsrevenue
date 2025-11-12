import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async (event) => {
  const { VITE_NOTION_TOKEN, VITE_NOTION_DATABASE_ID } = process.env;

  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${VITE_NOTION_DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${VITE_NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "Published",
            checkbox: { equals: true },
          },
          sorts: [{ property: "Date", direction: "descending" }],
        }),
      }
    );

    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: (err as Error).message }),
    };
  }
};

export { handler };
