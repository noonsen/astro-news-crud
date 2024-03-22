import type { APIRoute } from "astro";
import { supabase } from "@/supabase";

// Create an Update form in tsx to update news article supabase table       

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  const { data, error } = await supabase.from("news_article").select().eq("id", id);
  console.log(data)
  if (error) return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const POST: APIRoute = async ({ params, request }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const { data: updated, error } = await supabase.from("news").update(data).eq("id", id);
  if (error) return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify(updated), { status: 200 });
};

