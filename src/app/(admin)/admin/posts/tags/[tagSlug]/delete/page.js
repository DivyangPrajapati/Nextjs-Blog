"use client";
import { useRouter } from "next/navigation";
export default async function DeleteTag({ params }) {
  const router = useRouter();

  await fetch(`/api/posts/tags/${params.tagSlug}/delete`, {
    method: "DELETE",
  });

  router.push("/admin/posts/tags");
  router.refresh();

  return (
    <>
      <h2 className="text-3xl font-bold mb-10">Tag Deleting...</h2>
    </>
  );
}
