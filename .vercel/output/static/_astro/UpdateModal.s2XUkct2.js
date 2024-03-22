import{s as y,j as e}from"./supabase.9Iv7BTZc.js";import{r as s}from"./index.LFf77hJu.js";const F=({id:l})=>{const[r,d]=s.useState(!1),[C,o]=s.useState(!1),[I,n]=s.useState(""),[i,c]=s.useState(""),[u,h]=s.useState(""),[b,m]=s.useState(""),[p,x]=s.useState(""),[g,j]=s.useState(null);s.useEffect(()=>{r&&w()},[r]);const w=async()=>{try{const{data:t,error:a}=await y.from("news_articles").select("id, title, description, body, date_published").eq("id",l).single();if(a)throw a;t&&(j(t.id),c(t.title),h(t.description),x(t.date_published),m(t.body))}catch(t){console.error("Error fetching news data:",t)}},N=()=>{d(!0),n(l),o(!0)},f=()=>{d(!1),n(null),o(!1)},v=async t=>{t.preventDefault();try{await S(),f(),alert("News updated successfully!")}catch(a){console.error("Error updating news:",a),alert("Failed to update news. Please try again.")}},S=async()=>{const{error:t}=await y.from("news_articles").update({title:i,description:u,body:b,date_published:p}).eq("id",l);if(t)throw t};return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:N,className:" px-3 py-2 font-semibold bg-blue-400 rounded-lg hover:transition-transform hover:scale-110 active:translate-y-1 p-1",children:"Update"}),r&&e.jsx("div",{className:"fixed top-0 left-0 z-50 w-full h-screenflex justify-center items-center ",children:e.jsxs("div",{className:"bg-white p-5 rounded-lg shadow-lg border border-black ",children:[e.jsx("h2",{className:"text-lg font-bold mb-4",children:"Update News Article"}),e.jsxs("div",{children:["ID: ",g]})," ",e.jsxs("form",{onSubmit:v,className:"space-y-4",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"title",className:"font-bold",children:"Title"}),e.jsx("input",{type:"text",id:"title",value:i,onChange:t=>c(t.target.value),className:"border border-gray-300 rounded-md p-2"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"description",className:"font-bold",children:"Description"}),e.jsx("textarea",{id:"description",value:u,onChange:t=>h(t.target.value),className:"border border-gray-300 rounded-md p-2"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"body",className:"font-bold",children:"Body"}),e.jsx("textarea",{id:"newsBody",name:"newsBody",rows:"4",required:!0,className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500",value:b,onChange:t=>m(t.target.value)})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{htmlFor:"datePublished",className:"font-bold",children:"Date Published"}),e.jsx("input",{type:"date",id:"datePublished",value:p,onChange:t=>x(t.target.value),className:"border border-gray-300 rounded-md p-2"})]}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx("button",{type:"submit",className:"bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600",children:"Update"}),e.jsx("button",{type:"button",onClick:f,className:"bg-red-400 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-red-500",children:"Cancel"})]})]})]})})]})};export{F as default};