"use client";
import { useRouter } from "next/navigation";
export default async function DeleteCategory({ params }) {
  const router = useRouter();

  await fetch(`/api/posts/categories/${params.catSlug}/delete`, {
    method: "DELETE",
  });

  router.push("/admin/posts/categories");
  router.refresh();

  return (
    <>
      <h2 className="text-3xl font-bold mb-10">Category Deleting...</h2>
    </>
  );
}
