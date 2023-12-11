"use client";
import { useRouter } from "next/navigation";
export default async function DeleteUser({ params }) {
  const router = useRouter();

  await fetch(`/api/users/${params.userSlug}/delete`, {
    method: "DELETE",
  });

  router.push("/admin/users");
  router.refresh();

  return (
    <>
      <h2 className="text-3xl font-bold mb-10">User Deleting...</h2>
    </>
  );
}
