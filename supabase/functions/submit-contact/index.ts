
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

async function appendToGoogleSheet(data: ContactFormData): Promise<boolean> {
  try {
    // Format row data for Google Sheets API
    const row = [
      data.name,
      data.email,
      data.subject,
      data.message,
      new Date().toISOString(),
    ];

    // Get the sheet ID and API key from environment variables
    const spreadsheetId = "1geT-zigutbdFIz0EYXTmKIxwTzalS9WfKjuPIKFltng";
    const apiKey = Deno.env.get("GOOGLE_SHEETS_API_KEY");
    const range = "Sheet1!A:E"; // Assuming columns A-E for the data

    if (!apiKey) {
      console.error("Google Sheets API key not found");
      return false;
    }

    console.log("Using Google Sheets API key:", apiKey);
    console.log("Attempting to append to spreadsheet:", spreadsheetId);

    // Append data to the Google Sheet
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [row],
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to append to Google Sheets:", await response.text());
      return false;
    }

    console.log("Successfully appended data to Google Sheet");
    return true;
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    return false;
  }
}

serve(async (req) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Create a Supabase client
  const supabaseUrl = "https://kxvdamaycgeioudmjrli.supabase.co";
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Parse the request body
    const formData: ContactFormData = await req.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Store in Supabase
    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      })
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to store contact message" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Append to Google Sheet
    const sheetResult = await appendToGoogleSheet(formData);
    if (!sheetResult) {
      console.warn("Google Sheet update failed, but database update succeeded");
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact message submitted successfully",
        data,
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
