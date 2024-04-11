import type { APIRoute } from "astro";
import { supabase } from "@/supabase";

// Define the POST route handler for user signin
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  // Parse form data from the request body
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  // Check if email and password are provided
  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  // Attempt to sign in the user with Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // Handle any errors that occur during signin
  if (error) {
    return new Response(error.message, { status: 500 });
  }

  // If signin is successful, set access and refresh tokens as cookies and redirect to home page
  const { access_token, refresh_token } = data.session;
  cookies.set("sb-access-token", access_token, {
    path: "/",
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
  });
  return redirect("/");
};
