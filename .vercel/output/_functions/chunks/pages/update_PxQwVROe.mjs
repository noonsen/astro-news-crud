import { s as supabase } from './create_KPY8eRX7.mjs';

const GET = async ({ params }) => {
  const { id } = params;
  const { data, error } = await supabase.from("news_article").select().eq("id", id);
  console.log(data);
  if (error)
    return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};
const POST = async ({ params, request }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const { data: updated, error } = await supabase.from("news").update(data).eq("id", id);
  if (error)
    return new Response(error.message, { status: 500 });
  return new Response(JSON.stringify(updated), { status: 200 });
};

export { GET, POST };
