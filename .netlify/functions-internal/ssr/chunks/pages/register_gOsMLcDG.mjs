/* empty css                           */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as renderComponent, f as addAttribute, g as renderHead } from '../astro_HRyy38CH.mjs';
import 'clsx';
import { B as Button } from './create_WhF9eosp.mjs';

const $$Astro$1 = createAstro();
const $$RegisterForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RegisterForm;
  return renderTemplate`${maybeRenderHead()}<body class="bg-white h-screen flex items-center justify-center"> <div class="bg-white p-8 rounded-lg shadow-md w-96 border border-black "> <h1 class="flex justify-center text-2xl font-bold mb-4 text-black">Admin Registration</h1> <form action="/api/auth/register" method="post"> <div class="mb-4 flex flex-wrap"> <div class="w-full md:w-1/2 pr-2"> <label for="first_name" class="block text-sm font-medium text-gray-600">First Name</label> <input type="text" id="first_name" name="first_name" class="mt-1 p-2 w-full border border-black rounded-md bg-white text-black"> </div> <div class="w-full md:w-1/2 pr-2"> <label for="last_name" class="block text-sm font-medium text-gray-600">Last Name</label> <input type="text" id="last_name" name="last_name" class="mt-1 p-2 w-full border border-black rounded-md bg-white text-black"> </div> </div> <div class="mb-4"> <label for="email" class="block text-sm font-medium text-gray-600">Email Address</label> <input type="email" id="email" name="email" class="mt-1 p-2 w-full border border-black rounded-md bg-white text-black"> </div> <div class="mb-4"> <label for="password" class="block text-sm font-medium text-gray-600">Password</label> <input type="password" id="password" name="password" class="mt-1 p-2 w-full border border-black rounded-md bg-white text-black"> </div> <div class="flex flex-col items-center"> ${renderComponent($$result, "Button", Button, { "type": "submit", "className": "mb-4 w-full border border-black bg-black text-white hover:bg-zinc-700 active:bg-zinc-800" }, { "default": ($$result2) => renderTemplate`
Register
` })} <p class="text-center">
Already have an account? <a href="/signin" class="text-blue-500  hover:text-blue-200 hover:underline">Login now!</a> </p> </div> </form> </div>  </body>`;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/components/RegisterForm.astro", void 0);

const $$Astro = createAstro();
const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Register;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Register</title>${renderHead()}</head> <body title="Welcome to my CRUD App!"> ${renderComponent($$result, "RegisterForm", $$RegisterForm, {})} </body></html>`;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/register.astro", void 0);

const $$file = "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/register.astro";
const $$url = "/register";

export { $$Register as default, $$file as file, $$url as url };
