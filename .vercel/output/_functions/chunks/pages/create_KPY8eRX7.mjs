/* empty css                           */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as renderComponent, s as spreadAttributes, f as addAttribute, g as renderHead, h as renderSlot } from '../astro_s_LJnDJ7.mjs';
import { clsx } from 'clsx';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
/* empty css                          */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://cmorkhsivaqnrceomkmw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtb3JraHNpdmFxbnJjZW9ta213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzMzY2MzYsImV4cCI6MjAyMzkxMjYzNn0.YT_D3EWZoZg-g0dZVohTuM3uwCyutKYxff2gAcCdoHk"
);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const $$Astro$5 = createAstro();
const $$CreateButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$CreateButton;
  return renderTemplate`${maybeRenderHead()}<a href="/create"> ${renderComponent($$result, "Button", Button, { "className": "bg-white border border-black text-black hover:bg-black hover:text-white hover:transition-transform hover:scale-110 " }, { "default": ($$result2) => renderTemplate`
Create New Article
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"> <path fill="currentColor" d="M11.5 12.5V16q0 .213.144.356q.144.144.357.144t.356-.144q.143-.143.143-.356v-3.5H16q.213 0 .356-.144q.144-.144.144-.357t-.144-.356Q16.213 11.5 16 11.5h-3.5V8q0-.213-.144-.356Q12.212 7.5 12 7.5t-.356.144Q11.5 7.788 11.5 8v3.5H8q-.213 0-.356.144q-.144.144-.144.357t.144.356q.144.143.356.143zm.503 8.5q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21M12 20q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"></path> </svg> ` })} </a>`;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/components/CreateButton.astro", void 0);

const $$Astro$4 = createAstro();
const $$Sidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const props = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<aside class="bg-white p-4 box-shadow shadow-sm border-r-2 border-zinc-800 font-semibold overflow-y-auto h-screen"> <ul class="text-black flex flex-col"> <li class="flex items-center mb-4 px-4 py-2 hover:bg-gray-200 hover:rounded-lg hover:scale-110 transition-transform"> <a href="/" class="flex items-center "> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 24 24"> <path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h6V5H5zm8 0h6v-7h-6zm0-9h6V5h-6z"></path> </svg>
Dashboard
</a> </li> <li class="flex items-center mb-4 px-4 py-2 hover:bg-gray-200 hover:rounded-lg hover:scale-110 transition-transform"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 24 24"> <path fill="currentColor" d="M18 11h-2q-.425 0-.712-.288T15 10q0-.425.288-.712T16 9h2V7q0-.425.288-.712T19 6q.425 0 .713.288T20 7v2h2q.425 0 .713.288T23 10q0 .425-.288.713T22 11h-2v2q0 .425-.288.713T19 14q-.425 0-.712-.288T18 13zm-9 1q-1.65 0-2.825-1.175T5 8q0-1.65 1.175-2.825T9 4q1.65 0 2.825 1.175T13 8q0 1.65-1.175 2.825T9 12m-8 6v-.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2v.8q0 .825-.587 1.413T15 20H3q-.825 0-1.412-.587T1 18m2 0h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T9 15q-1.4 0-2.775.338T3.5 16.35q-.225.125-.363.35T3 17.2zm6-8q.825 0 1.413-.587T11 8q0-.825-.587-1.412T9 6q-.825 0-1.412.588T7 8q0 .825.588 1.413T9 10m0 8"></path> </svg> <a href="/register" class="text-black">Register</a> </li> <li class="flex items-center mb-4 px-4 py-2 hover:bg-gray-200 hover:rounded-lg hover:scale-110 transition-transform"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 24 24"> <path fill="currentColor" d="M13 21q-.425 0-.712-.288T12 20q0-.425.288-.712T13 19h6V5h-6q-.425 0-.712-.288T12 4q0-.425.288-.712T13 3h6q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-1.825-8H4q-.425 0-.712-.288T3 12q0-.425.288-.712T4 11h7.175L9.3 9.125q-.275-.275-.275-.675t.275-.7q.275-.3.7-.313t.725.288L14.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288T9.3 16.25q-.275-.3-.262-.712t.287-.688z"></path> </svg> <a href="/signin" class="text-black">Login</a> </li> <li class="flex items-center mb-4 px-4 py-2 hover:bg-gray-200 hover:rounded-lg hover:scale-110 transition-transform text-black"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 24 24 "${spreadAttributes(props)}> <path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4q0 .425-.288.713T11 5H5v14h6q.425 0 .713.288T12 20q0 .425-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12q0-.425.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7q.275-.3.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z"></path> </svg> <form action="/api/auth/signout"> <button class="text-black">Logout</button> </form> </li> </ul> <hr class="border-t border-gray-300 my-4"> ${renderComponent($$result, "CreateButton", $$CreateButton, {})} </aside>`;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/components/Sidebar.astro", void 0);

const $$Astro$3 = createAstro();
const $$ThemeToggle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ThemeToggle;
  return renderTemplate`${maybeRenderHead()}<button class="" aria-label="Theme Toggler" data-theme-toggle data-astro-cid-x3pjskd3> <svg width="25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-astro-cid-x3pjskd3> <path class="sun" fill-rule="evenodd" d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm12-7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1 0-1.6h2.4a.8.8 0 0 1 .8.8zM4 12a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1 0-1.6h2.5a.8.8 0 0 1 .8.8zm16.5-8.5a.8.8 0 0 1 0 1l-1.8 1.8a.8.8 0 0 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM6.3 17.7a.8.8 0 0 1 0 1l-1.7 1.8a.8.8 0 1 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM12 0a.8.8 0 0 1 .8.8v2.5a.8.8 0 0 1-1.6 0V.8A.8.8 0 0 1 12 0zm0 20a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1-1.6 0v-2.4a.8.8 0 0 1 .8-.8zM3.5 3.5a.8.8 0 0 1 1 0l1.8 1.8a.8.8 0 1 1-1 1L3.5 4.6a.8.8 0 0 1 0-1zm14.2 14.2a.8.8 0 0 1 1 0l1.8 1.7a.8.8 0 0 1-1 1l-1.8-1.7a.8.8 0 0 1 0-1z" data-astro-cid-x3pjskd3></path> <path class="moon" fill-rule="evenodd" d="M16.5 6A10.5 10.5 0 0 1 4.7 16.4 8.5 8.5 0 1 0 16.4 4.7l.1 1.3zm-1.7-2a9 9 0 0 1 .2 2 9 9 0 0 1-11 8.8 9.4 9.4 0 0 1-.8-.3c-.4 0-.8.3-.7.7a10 10 0 0 0 .3.8 10 10 0 0 0 9.2 6 10 10 0 0 0 4-19.2 9.7 9.7 0 0 0-.9-.3c-.3-.1-.7.3-.6.7a9 9 0 0 1 .3.8z" data-astro-cid-x3pjskd3></path> </svg> </button>  `;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/components/ThemeToggle.astro", void 0);

const $$Astro$2 = createAstro();
const $$Navigation = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navigation;
  Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav class="bg-white p-2 flex items-center justify-between border-b-2 border-zinc-900 "> <div> <ul class="flex items-center text-black"> <a href="/" class="font-bold text-xl font-mono"> <div class="pl-5 pt-5 flex justify-center"> <img src="/arkgrouplogo.svg" alt=""> </div> </a> </ul> </div> <div class="flex items-center gap-4"> <!-- Added flex container --> <div> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})} </div> <div> <a href="#" class="text-black font-bold font-mono">Profile</a> </div> </div> </nav>`;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/components/Navigation.astro", void 0);

const $$Astro$1 = createAstro();
const $$NewsLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$NewsLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <div> ${renderComponent($$result, "Nav", $$Navigation, {})} <div class="flex"> ${renderComponent($$result, "Sidebar", $$Sidebar, {})} ${renderSlot($$result, $$slots["default"])} </div> </div> </html>`;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/layouts/NewsLayout.astro", void 0);

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadedFileName(selectedFile.name);
  };
  const handleFileDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    setFile(selectedFile);
    setUploadedFileName(selectedFile.name);
  };
  const uploadFile = async () => {
    try {
      if (!file) {
        console.error("No file selected");
        return;
      }
      setIsUploading(true);
      const { data, error } = await supabase.storage.from("news_images").upload(`/${file.name}`, file);
      setIsUploading(false);
      if (error) {
        console.error("Error uploading file:", error.message);
        setUploadError(true);
        return;
      }
      console.log("File uploaded:", data.Key);
      setUploadSuccess(true);
      setFile(null);
      setUploadedFileName("");
    } catch (error) {
      setIsUploading(false);
      console.error("Error uploading file:", error);
      setUploadError(true);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md mx-auto p-4 bg-white rounded shadow-lg", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg mb-4",
        onDragOver: (e) => e.preventDefault(),
        onDrop: handleFileDrop,
        children: /* @__PURE__ */ jsxs("label", { htmlFor: "file-upload", className: "flex flex-col items-center space-y-2", children: [
          /* @__PURE__ */ jsxs(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "w-12 h-12 text-gray-500",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              children: [
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    fillRule: "evenodd",
                    d: "M3 5a2 2 0 012-2h10a2 2 0 012 2v2.586a1 1 0 01-.293.707l-4.5 4.5a1 1 0 01-1.414 0l-4.5-4.5A1 1 0 013 7.586V5zm14 2.586V5a3 3 0 00-3-3H5a3 3 0 00-3 3v2.586A1 1 0 002 8.293l5 5a1 1 0 001.414 0l5-5a1 1 0 00-.707-1.707z",
                    clipRule: "evenodd"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    fillRule: "evenodd",
                    d: "M2.293 9.707a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0zM13 18a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a1 1 0 011-1h12a1 1 0 011 1v4zm1-10.414V15a3 3 0 01-3 3H4a3 3 0 01-3-3v-7a1 1 0 011-1h4.586a1 1 0 01.707.293l3 3a1 1 0 01.293.707z",
                    clipRule: "evenodd"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Drag & drop your image here" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "Or select from your computer" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              className: "hidden",
              onChange: handleFileChange,
              accept: "image/*",
              id: "file-upload"
            }
          ),
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "file-upload",
              className: "py-2 px-4 bg-blue-400 border border-black text-black rounded-md cursor-pointer",
              children: "Select Image"
            }
          )
        ] })
      }
    ),
    uploadedFileName && /* @__PURE__ */ jsxs("p", { className: "mt-2 text-gray-700 truncate", children: [
      "Selected file: ",
      uploadedFileName
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: `mt-2 w-full py-2 px-4 ${isUploading ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"} text-black border border-black rounded-md active:transition-transform active:translate-y-1`,
        onClick: uploadFile,
        disabled: isUploading,
        children: isUploading ? "Uploading..." : "Upload Image to Bucket"
      }
    ),
    uploadSuccess && /* @__PURE__ */ jsx("div", { className: "mt-2 p-2 bg-green-200 text-green-800 rounded flex items-center justify-center", children: "Image uploaded successfully!" }),
    uploadError && /* @__PURE__ */ jsx("div", { className: "mt-2 p-2 bg-red-200 text-red-800 rounded", children: "Error uploading image. Please try again." })
  ] }) });
};

const CreateNewsForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [body, setBody] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.from("news_articles").insert([{ title, description, body, date_published: datePublished }]);
      if (error) {
        throw error;
      }
      setTitle("");
      setDescription("");
      setBody("");
      setDatePublished("");
      alert("News added successfully!");
    } catch (error) {
      console.error("Error adding news:", error);
      console.log("Failed to add news. Please try again.");
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto p-4 m-10 bg-gray-100 border border-black rounded", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 p-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Create News Article" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "max-w-lg", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "newsTitle", className: "block text-gray-700 font-bold", children: "News Title:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "newsTitle",
              name: "newsTitle",
              required: true,
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500",
              value: title,
              onChange: (e) => setTitle(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "newsDescription", className: "block text-gray-700 font-bold", children: "News Description:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "newsDescription",
              name: "newsDescription",
              required: true,
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500",
              value: description,
              onChange: (e) => setDescription(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "newsBody", className: "block text-gray-700 font-bold", children: "News Body:" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "newsBody",
              name: "newsBody",
              rows: "4",
              required: true,
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500",
              value: body,
              onChange: (e) => setBody(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "datePublished", className: "block text-gray-700 font-bold", children: "Date Published:" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              id: "datePublished",
              name: "datePublished",
              required: true,
              className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500",
              value: datePublished,
              onChange: (e) => setDatePublished(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "bg-green-500 py-2 px-4 border border-black rounded-md hover:bg-green-600 active:transition-transform active:translate-y-1", children: "Upload" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full md:w-1/2 p-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-bold flex justify-center p-5", children: "Upload News Article Image:" }),
      /* @__PURE__ */ jsx(UploadImage, {})
    ] })
  ] }) });
};

const $$Astro = createAstro();
const $$Create = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Create;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> ${renderComponent($$result, "NewsLayout", $$NewsLayout, { "title": "News Board" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CreateNews", CreateNewsForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/CreateForm.tsx", "client:component-export": "default" })} ` })} </html>`;
}, "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/create.astro", void 0);

const $$file = "C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/create.astro";
const $$url = "/create";

const create = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Create,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Navigation as $, Button as B, $$Sidebar as a, $$NewsLayout as b, create as c, supabase as s };
