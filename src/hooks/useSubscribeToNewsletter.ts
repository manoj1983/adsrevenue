
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useSubscribeToNewsletter = () => {
  const [isLoading, setIsLoading] = useState(false);

  const subscribeToNewsletter = async (email: string) => {
    if (!email) {
      toast.error("Please enter an email address.");
      return false;
    }

    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email });

      if (error) {
        if (error.code === "23505") {
          // Unique violation error code
          toast.info("You're already subscribed to our newsletter!");
          return true;
        }
        throw new Error(error.message);
      }

      toast.success("Successfully subscribed to our newsletter!");
      return true;
    } catch (error: any) {
      toast.error(`Error subscribing: ${error.message}`);
      console.error("Error subscribing to newsletter:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { subscribeToNewsletter, isLoading };
};
