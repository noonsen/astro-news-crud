/* empty css                           */
import { c as createAstro, d as createComponent, r as renderTemplate, f as addAttribute, g as renderHead, e as renderComponent } from '../astro_s_LJnDJ7.mjs';
import { b as $$NewsLayout } from './create_ZaFRnUQO.mjs';
import { U as UpdateModal } from './index_sLA7e9RT.mjs';

const $$Astro = createAstro();
const $$Update = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Update;
  const { id, title, description, date_published } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> ${renderComponent($$result, "NewsLayout", $$NewsLayout, { "title": "News Board" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "UpdateNews", UpdateModal, { "id": id, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/UpdateModal", "client:component-export": "default" })} ` })} </html>`;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/update.astro", void 0);

const $$file = "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/update.astro";
const $$url = "/update";

export { $$Update as default, $$file as file, $$url as url };
