import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";

async function getPosts() {
  const res = await fetch(`${process.env.BASE_URL}/api/posts`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data.posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Blog</h1>
      <div className="my-24 flex flex-wrap">
        <div className="w-full md:w-2/3 xl:w-3/4 px-6">
          
            { posts ? 
              (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                  {posts.map((post) => (
                    <div key={post._id}>
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>
            ) : (
              <div className="text-2xl p-5 shadow border-slate-200 text-center">
                No posts found
              </div>
            )}
          
        </div>

        <Sidebar />
      </div>
    </>
  );
}
