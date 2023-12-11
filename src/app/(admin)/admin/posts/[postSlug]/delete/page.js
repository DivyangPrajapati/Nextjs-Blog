"use client";
import { useRouter } from "next/navigation";
export default async function DeletePost({ params }) {
  const router = useRouter();

  await fetch(`/api/posts/${params.postSlug}/delete`, {
    method: "DELETE",
  });

  router.push("/admin/posts");
  router.refresh();

  return (
    <>
      <h2 className="text-3xl font-bold mb-10">Post Deleting...</h2>
    </>
  );
}
