import { supabase } from "@/supabase";
import type { APIRoute } from "astro";

// Define CORS headers
const CORS_HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Simple in-memory rate limiting
const rateLimit = (limit: number, interval: number) => {
    const users = new Map();
    return (ip: string) => {
        const now = Date.now();
        const resetTime = now + interval;
        if (!users.has(ip)) {
            users.set(ip, { count: 1, resetTime });
            return true;
        }
        const user = users.get(ip);
        if (now > user.resetTime) {
            user.count = 1;
            user.resetTime = resetTime;
            return true;
        }
        if (user.count < limit) {
            user.count++;
            return true;
        }
        return false;
    };
};

// Rate limit settings: 100 requests per 15 minutes
const rateLimiter = rateLimit(100, 15 * 60 * 1000);

const validateArticleData = (article) => {
    return (
        typeof article.id === 'number' &&
        typeof article.title === 'string' &&
        typeof article.description === 'string' &&
        typeof article.date_published === 'string' &&
        typeof article.body === 'string' &&
        typeof article.images === 'string'
    );
};

// Define the GET route handler for fetching news articles data
export const GET: APIRoute = async ({ request }) => {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || request.connection.remoteAddress;
    if (!rateLimiter(ip)) {
        return new Response(JSON.stringify({ error: "Too many requests, please try again later." }), {
            status: 429,
            headers: CORS_HEADERS,
        });
    }

    // Basic Authentication
    const auth = request.headers.get('Authorization');
    if (!auth || auth !== `Basic ${btoa('username:password')}`) {  // Replace 'username:password' with actual credentials
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: CORS_HEADERS,
        });
    }

    try {
        // Fetch news articles data from Supabase
        const { data, error } = await supabase
            .from('news_articles')
            .select('*');

        // Handle error if any
        if (error) {
            console.error("Error fetching data from Supabase:", error.message);
            throw new Error("Error fetching data from Supabase");
        }

        // Validate and map fetched data to card objects
        const news = data.map(article => {
            if (!validateArticleData(article)) {
                throw new Error("Invalid article data format");
            }
            return {
                id: article.id,
                title: article.title,
                description: article.description,
                date_published: article.date_published,
                body: article.body,
                images: article.images,
            };
        });

        // Return the data with a 'news' property
        return new Response(JSON.stringify({ news }), {
            status: 200,
            headers: CORS_HEADERS,
        });
    } catch (error) {
        console.error("Internal server error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: CORS_HEADERS,
        });
    }
};

// Handle preflight OPTIONS request for CORS
export const OPTIONS: APIRoute = async () => {
    return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
    });
};
