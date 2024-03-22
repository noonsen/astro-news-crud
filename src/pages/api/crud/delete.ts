// TS Function for Delete API to integrate to DeleteButton.tsx
// delete.ts
import type { APIRoute } from "astro";
import { supabase } from "@/supabase";

export const DELETE: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const { error } = await supabase
  .from("news_article")
  .delete()
  .eq("id", id);
  
  if (error) return new Response(error.message, { status: 500 });
  return new Response("Record deleted.", { status: 200 });
};

