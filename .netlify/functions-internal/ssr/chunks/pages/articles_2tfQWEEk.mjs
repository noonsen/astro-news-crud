import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://cmorkhsivaqnrceomkmw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtb3JraHNpdmFxbnJjZW9ta213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzMzY2MzYsImV4cCI6MjAyMzkxMjYzNn0.YT_D3EWZoZg-g0dZVohTuM3uwCyutKYxff2gAcCdoHk"
);

const GET = async ({}) => {
  try {
    const { data, error } = await supabase.from("news_articles").select("*");
    if (error) {
      throw error;
    }
    const cards = data.map((article) => ({
      id: article.id,
      title: article.title,
      description: article.description,
      date_published: article.date_published,
      body: article.body,
      images: article.images
      // Add other properties if needed
    }));
    return new Response(JSON.stringify({ cards }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const articles_json = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

export { articles_json as a, supabase as s };
