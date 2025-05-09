
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// CORS headers for browser compatibility
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Handle CORS preflight requests
const handleCors = (req: Request): Response | null => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  return null;
};

serve(async (req) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Get the sheet ID and API key from environment variables
    const spreadsheetId = "1geT-zigutbdFIz0EYXTmKIxwTzalS9WfKjuPIKFltng";
    const apiKey = Deno.env.get("GOOGLE_SHEETS_API_KEY");
    
    if (!apiKey) {
      console.error("Google Sheets API key not found");
      return new Response(
        JSON.stringify({ error: "API key not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Optionally get range from query parameters
    const url = new URL(req.url);
    const range = url.searchParams.get("range") || "Sheet1!A:E"; // Default to Sheet1, columns A to E

    console.log(`Fetching data from spreadsheet: ${spreadsheetId}, range: ${range}`);

    // Call the Google Sheets API to get the data
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch from Google Sheets:", await response.text());
      return new Response(
        JSON.stringify({ error: "Failed to fetch data from Google Sheets" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const data = await response.json();

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        data: data.values,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
