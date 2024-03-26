import { supabase } from "@/supabase";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({  }) => {
    try {
        const { data, error } = await supabase
            .from('news_articles')
            .select('*');

        if (error) {
            throw error;
        }

        // Map fetched data to card objects
        const cards = data.map(article => ({
            id: article.id,
            title: article.title,
            description: article.description,
            date_published: article.date_published,
            body: article.body,
            images: article.images,
            // Add other properties if needed
        }));

        // Return the data with a 'cards' property
        return new Response(JSON.stringify({ cards }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};
