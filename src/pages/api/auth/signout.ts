import type { APIRoute } from "astro";

// Define the GET route handler for user signout
export const GET: APIRoute = async ({ cookies, redirect }) => {
  // Delete access and refresh tokens cookies
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });

  // Redirect user to signin page after successful signout
  return redirect("/signin");
};
