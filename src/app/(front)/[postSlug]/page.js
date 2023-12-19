import GoBack from "@/components/GoBack";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getPost(slug) {
  const res = await fetch(`${process.env.BASE_URL}/api/posts/${slug}?withcat=1`);

  const data = await res.json();

  if (data.hasOwnProperty("success") && !data.success) {
    notFound();
  }

  return data;
}

export default async function SinglePost({ params }) {
  const post = await getPost(params.postSlug);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full md:w-2/3 xl:w-3/4 px-3">
          <h2 className="text-3xl font-bold mb-10">{post.title}</h2>
          <div className="mb-6">
            {post.thumbnail && <Image src={post.thumbnail} width={0} height={0} sizes="100%" priority={true} className="w-full h-auto" alt="{post.title}"/>}
          </div>
          <div className="mb-6">
            <p className="mb-2">{post.content}</p>
            {post.categories &&
          <p className="mb-2 text-sm"><span className="font-bold">Categories:</span> {post.categories.map((category) => category.title).join(", ")}</p>}
          </div>
          <p className="text-sm italic mb-10">{post.author?.name}</p>

          <GoBack />    
        </div>

        <Sidebar />
      </div>
    </>
  );
}
