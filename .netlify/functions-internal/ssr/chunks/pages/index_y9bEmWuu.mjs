/* empty css                           */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, e as renderComponent, g as renderHead, h as renderSlot } from '../astro_HRyy38CH.mjs';
import { $ as $$Navigation, a as $$Sidebar } from './create_WhF9eosp.mjs';
import 'clsx';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { s as supabase } from './articles_2tfQWEEk.mjs';
import { useState, useEffect } from 'react';

const DeleteButton = ({ id }) => {
  const handleFetchData = async () => {
    try {
      const { data, error } = await supabase.from("news_articles").delete().eq("id", id).single();
      if (error) {
        throw error;
      }
      if (data) {
        console.log("Data errors");
      } else {
        console.log("Deleted data id:", id);
        alert("Deleted Article Successfully!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return /* @__PURE__ */ jsx("button", { onClick: () => {
    handleFetchData();
  }, "aria-label": "UpdateButton", className: "bg-red-400 rounded-lg hover:transition-transform hover:scale-110 active:translate-y-1 border ", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { fill: "#1D1C1C", d: "M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z" }) }) });
};

const UpdateModal = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [newsId, setNewsId] = useState(null);
  useEffect(() => {
    if (showModal) {
      fetchNewsData();
    }
  }, [showModal]);
  const fetchNewsData = async () => {
    try {
      const { data, error } = await supabase.from("news_articles").select("id, title, description, body, date_published").eq("id", id).single();
      if (error) {
        throw error;
      }
      if (data) {
        setNewsId(data.id);
        setTitle(data.title);
        setDescription(data.description);
        setDatePublished(data.date_published);
        setBody(data.body);
      }
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };
  const handleOpenModal = () => {
    setShowModal(true);
    setSelectedItemId(id);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItemId(null);
    setIsModalOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNews();
      handleCloseModal();
      alert("News updated successfully!");
    } catch (error) {
      console.error("Error updating news:", error);
      alert("Failed to update news. Please try again.");
    }
  };
  const updateNews = async () => {
    const { error } = await supabase.from("news_articles").update({
      title,
      description,
      body,
      date_published: datePublished
    }).eq("id", id);
    if (error) {
      throw error;
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("button", { onClick: handleOpenModal, className: " flex items-end px-3 py-2 font-semibold bg-blue-400 rounded-lg hover:transition-transform hover:scale-110 active:translate-y-1 p-1", children: [
      /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "gap-2", width: "20", height: "20", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { fill: "#070606", d: "M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z" }) }),
      "Update"
    ] }),
    showModal && /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 z-50 h-screen w-full flex justify-center items-center backdrop-filter backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "bg-white p-5 w-96 active:bg-blur rounded-lg shadow-lg border border-black ", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold mb-4", children: "Update News Article" }),
      /* @__PURE__ */ jsxs("div", { children: [
        "ID: ",
        newsId
      ] }),
      " ",
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "title", className: "font-bold", children: "Title" }),
          /* @__PURE__ */ jsx("input", { type: "text", id: "title", value: title, onChange: (e) => setTitle(e.target.value), className: "border border-gray-300 rounded-md p-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "description", className: "font-bold", children: "Description" }),
          /* @__PURE__ */ jsx("textarea", { id: "description", value: description, onChange: (e) => setDescription(e.target.value), className: "border border-gray-300 rounded-md p-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "body", className: "font-bold", children: "Body" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "newsBody",
              name: "newsBody",
              rows: 4,
              required: true,
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500",
              value: body,
              onChange: (e) => setBody(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "datePublished", className: "font-bold", children: "Date Published" }),
          /* @__PURE__ */ jsx("input", { type: "date", id: "datePublished", value: datePublished, onChange: (e) => setDatePublished(e.target.value), className: "border border-gray-300 rounded-md p-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end", children: [
          /* @__PURE__ */ jsxs("button", { type: "submit", className: "bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600", children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { fill: "#070606", d: "M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z" }) }),
            "Update"
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleCloseModal, className: "bg-red-400 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-red-500", children: "Cancel" })
        ] })
      ] })
    ] }) })
  ] });
};

const $$Astro$3 = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Card;
  const { id, title, description, date_published, body, images } = Astro2.props;
  return renderTemplate`<!-- Card.astro -->${maybeRenderHead()}<div class="relative flex flex-col mt-6 text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl w-96"> <div class="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40"> <img${addAttribute(images, "src")} alt="card-image" class="w-full h-full object-cover"> </div> <div class="p-6"> <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"> ${title} </h5> <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit"> ${description} </p> <span class="inline-block px-2 py-1 mt-2 text-sm font-medium bg-blue-500 text-white rounded"> ${date_published} </span> </div> <div class="p-6 pt-0 flex justify-end"> ${renderComponent($$result, "UpdateButton", UpdateModal, { "id": id, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/UpdateModal", "client:component-export": "default" })} ${renderComponent($$result, "DeleteButton", DeleteButton, { "id": id, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/DeleteButton", "client:component-export": "default" })} </div> </div>`;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/components/Card.astro", void 0);

const $$Astro$2 = createAstro();
const $$Cards = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Cards;
  const { cards } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="container mx-auto gap-6 p-6 z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 "> ${cards.sort((a, b) => new Date(a.date_published).getTime() - new Date(b.date_published).getTime()).map((card) => renderTemplate`${renderComponent($$result, "Card", $$Card, { ...card })}`)} </div>`;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/components/Cards.astro", void 0);

const $$Astro$1 = createAstro();
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { data: news_articles, error } = await supabase.from("news_articles").select("*");
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title></title>${renderHead()}</head> <div> ${renderComponent($$result, "Nav", $$Navigation, {})} <div class="flex"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} <main class="p-4 flex-1 "> ${error && renderTemplate`<div>Error: ${error.message}</div>`} ${news_articles && renderTemplate`${renderComponent($$result, "Cards", $$Cards, { "cards": news_articles.map((article) => ({
    id: article.id,
    title: article.title,
    description: article.description,
    date_published: article.date_published,
    body: article.body,
    images: article.images
  })) })}`} </main> ${renderSlot($$result, $$slots["default"])} </div> </div> </html>`;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/layouts/BaseLayout.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { cookies, redirect } = Astro2;
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");
  if (!accessToken || !refreshToken) {
    return redirect("/signin");
  }
  const { error } = await supabase.auth.setSession({
    refresh_token: refreshToken.value,
    access_token: accessToken.value
  });
  if (error) {
    cookies.delete("sb-access-token", {
      path: "/"
    });
    cookies.delete("sb-refresh-token", {
      path: "/"
    });
    return redirect("/signin");
  }
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> ${renderComponent($$result, "Base", $$BaseLayout, { "title": "Home", "description": "this is the homepage" })} </html>`;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/index.astro", void 0);

const $$file = "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { UpdateModal as U, index as i };
