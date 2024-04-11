import type { APIRoute } from "astro";
import { supabase } from "@/supabase";

// Define the POST route handler for user registration
export const POST: APIRoute = async ({ request, redirect }) => {
  // Parse form data from the request body
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  // Check if email and password are provided
  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  // Attempt to register the user with Supabase Auth
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  // Handle any errors that occur during registration
  if (error) {
    return new Response(error.message, { status: 500 });
  }

  // If registration is successful, redirect the user to the signin page
  return redirect("/signin");
};
