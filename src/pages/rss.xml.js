import { Astro } from "@astro";

export const getRssItems = async () => {
  const items = [];

  try {
    // Fetch news articles data from Supabase
    const { data: newsArticles, error } = await supabase
      .from("news_articles")
      .select("*");

    if (error) {
      throw error;
    }

    // Iterate over each news article and generate an RSS item
    newsArticles.forEach((article) => {
      const rssItem = {
        title: article.title,
        description: article.description,
        link: `https://a2k-nms.netlify.app/api/${article.slug}`, // Adjust the URL as needed
        pubDate: new Date(article.date_published).toISOString(),
        content: article.body,
        // You can include additional custom data if needed
        customData: {
          author: article.author,
          category: article.category,
          // Add more custom fields here
        },
      };

      items.push(rssItem);
    });

    return items;
  } catch (error) {
    console.error("Error fetching news articles:", error);
    return [];
  }
};

export default function rss() {
  return {
    type: "json",
    content: getRssItems(),
  };
}
