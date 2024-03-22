async function rss() {
    const { data: news_articles, error } = await supabase
        .from('news_articles')
        .select('title, description, body, date_published, images');

    if (error) {
        throw error;
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <title>Astro RSS Feed</title>
            <link>http://localhost:3000/</link>
            <description>Latest News Articles</description>
            <atom:link href="http://localhost:3000/rss.xml" rel="self" type="application/rss+xml" />
            ${news_articles.map(article => `
            <item>
                <title>${article.title}</title>
                <description>${article.description}</description>
                <link>http://localhost:3000/news/${article.id}</link>
                <pubDate>${article.date_published.toUTCString()}</pubDate>
                <guid isPermaLink="true">http://localhost:3000/news/${article.id}</guid>
                <media:content url="${article.images}" medium="image" />
            </item>
            `).join('')}
        </channel>
    </rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml'
        }
    });
}

export { rss };
