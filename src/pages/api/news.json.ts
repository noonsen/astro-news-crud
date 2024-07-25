import { supabase } from "@/supabase";
import type { APIRoute } from "astro";

// Define the GET route handler for fetching news articles data
export const GET: APIRoute = async ({ }) => {
    try {
        // Fetch news articles data from Supabase
        const { data, error } = await supabase
            .from('news_articles')
            .select('*');

        // Handle error if any
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
        // Return internal server error if any error occurs
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};