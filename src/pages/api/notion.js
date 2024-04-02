import { Client } from "@notionhq/client";

const { NOTION_KEY, NOTION_DB } = import.meta.env;

// Initializing a client
const notion = new Client({
  auth: NOTION_KEY,
});

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DB,
      filter: {
        property: "Status",
        status: {
          equals: "Live",
        },
      },
    });
    return new Response(JSON.stringify(response.results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: e.toString(),
    };
  }
}
