import PostCard from "@/components/admin/PostCard";

async function getPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/posts?status=all`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data.posts;
}

export default async function Posts() {
  const posts = await getPosts();

  if(posts.length === 0) {
    return (
      <h2 className="font-bold">No posts found</h2>
      )
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-10">All Posts</h2>

      <div className="relative overflow-auto">
        <table className="border-collapse table-auto w-full text-sm">
          <thead>
            <tr>
            <th className="border-t border-b-2 border-slate-200 p-4 text-left">
                Image
              </th>
              <th className="border-t border-b-2 border-slate-200 p-4 text-left">
                Title
              </th>
              <th className="border-t border-b-2 border-slate-200 p-4 text-left">
                Author
              </th>
              <th className="border-t border-b-2 border-slate-200 p-4 text-left">
                Status
              </th>
              <th className="border-t border-b-2 border-slate-200 p-4 text-left">
                Published At
              </th>
              <th className="border-t border-b-2 border-slate-200 p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.length !== 0 && (
              posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
