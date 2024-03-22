/* empty css                           */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, g as renderHead, e as renderComponent } from '../astro_s_LJnDJ7.mjs';
import 'clsx';

const $$Astro$1 = createAstro();
const $$LoginForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LoginForm;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white h-screen flex items-center justify-center"> <div class="bg-white p-8 rounded-lg shadow-md w-96 border border-black"> <h1 class="flex justify-center text-2xl font-bold mb-4 text-black">Admin Login</h1> <form action="api/auth/signin" method="post"> <div class="mb-4"> <label for="email" class="block text-sm font-medium text-gray-600">Email</label> <input type="email" id="email" name="email" class="mt-1 p-2 w-full border border-black rounded-md bg-white text-black"> </div> <div class="mb-4"> <label for="password" class="block text-sm font-medium text-gray-600">Password</label> <input type="password" id="password" name="password" class="mt-1 p-2 w-full border border-black rounded-md bg-white text-black"> </div> <div class="flex flex-col items-center"> <button type="submit" class="bg-black text-white mb-4 w-full border border-black rounded-lg size-10 hover:bg-zinc-700">
Login
</button> <p class="text-center">
Not yet registered? <a href="/register" class="text-blue-500 hover:text-blue-300 hover:underline">Create an account</a> </p> </div> </form> </div> <div></div></div>`;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/components/LoginForm.astro", void 0);

const $$Astro = createAstro();
const $$Signin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Signin;
  const { cookies } = Astro2;
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");
  if (accessToken && refreshToken) {
    return redirect("/");
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Login</title>${renderHead()}</head> <body title="Login Page"> ${renderComponent($$result, "LoginForm", $$LoginForm, {})} </body></html>`;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/signin.astro", void 0);

const $$file = "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/signin.astro";
const $$url = "/signin";

export { $$Signin as default, $$file as file, $$url as url };
