
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

async function sendToGoogleSheet(data: ContactFormData): Promise<boolean> {
  try {
    // Your Google Apps Script web app URL
    const googleScriptUrl = "https://script.google.com/macros/s/AKfycbz0FaOrDcwlEEF06PeGtdO_Tvr66U-fZ1Xyio1L5Jhc0warx7SYKCMnMoezmAqkAF2R/exec";
    
    console.log("Sending data to Google Sheet via Apps Script:", data);
    
    // Format data for Google Apps Script
    const formData = new URLSearchParams();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("subject", data.subject);
    formData.append("message", data.message);
    formData.append("timestamp", new Date().toISOString());
    
    // Send data to Google Apps Script
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    
    // Check if response is OK (status in 200-299 range)
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Apps Script error:", errorText);
      return false;
    }
    
    // Try to parse JSON response, but handle case where it's not JSON
    try {
      const result = await response.json();
      console.log("Google Apps Script response:", result);
      return result.success === true;
    } catch (parseError) {
      // If not JSON, check if status was OK
      console.log("Response was not JSON, but status was:", response.status);
      // Consider it successful if the status code was in the 2xx range
      return response.ok;
    }
  } catch (error) {
    console.error("Error sending to Google Sheet:", error);
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
    console.log("Received contact form data:", formData);

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

    // First, try to send to Google Sheet
    console.log("Attempting to send data to Google Sheet");
    const sheetResult = await sendToGoogleSheet(formData);
    if (!sheetResult) {
      console.warn("Google Sheet update failed, will still try to update database");
    } else {
      console.log("Successfully sent data to Google Sheet");
    }

    // Then, store in Supabase
    console.log("Storing contact message in database");
    const { data: existingContact, error: queryError } = await supabase
      .from("contact_messages")
      .select("id")
      .eq("email", formData.email)
      .limit(1);

    let result;
    
    if (existingContact && existingContact.length > 0) {
      // Update existing record
      console.log("Updating existing contact record", existingContact[0].id);
      result = await supabase
        .from("contact_messages")
        .update({
          name: formData.name,
          subject: formData.subject,
          message: formData.message
        })
        .eq("id", existingContact[0].id)
        .select();
    } else {
      // Insert new record
      console.log("Inserting new contact record");
      result = await supabase
        .from("contact_messages")
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        })
        .select();
    }
    
    if (result.error) {
      console.error("Supabase error:", result.error);
      return new Response(
        JSON.stringify({ error: "Failed to store contact message", details: result.error }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact message submitted successfully",
        data: result.data,
        sheetUpdated: sheetResult
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: String(error) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
