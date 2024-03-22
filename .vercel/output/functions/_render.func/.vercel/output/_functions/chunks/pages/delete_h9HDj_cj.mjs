import { s as supabase } from './create_KPY8eRX7.mjs';

const DELETE = async ({ params, request }) => {
  const { id } = params;
  const { error } = await supabase.from("news_article").delete().eq("id", id);
  if (error)
    return new Response(error.message, { status: 500 });
  return new Response("Record deleted.", { status: 200 });
};

export { DELETE };
