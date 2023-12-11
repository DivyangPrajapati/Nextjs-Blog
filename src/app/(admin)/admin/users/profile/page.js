import { getUserDataFromToken } from "@/utils/tokenUtil";
import Link from "next/link";

export default function Profile() {
  const me = getUserDataFromToken();
  return (
    <>
      <h2 className="text-3xl font-bold mb-10">Profile</h2>

      <div className="max-w-sm">
        <div className="grid grid-cols-2">
          <div className="px-4 py-2 font-bold">Name</div>
          <div className="px-4 py-2">{me.name}</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="px-4 py-2 font-bold">Email</div>
          <div className="px-4 py-2">{me.email}</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="px-4 py-2 font-bold">Role</div>
          <div className="px-4 py-2 capitalize">{me.role}</div>
        </div>
        <div className="mt-4">
          <Link href={`/admin/users/${me.slug}`} className="px-6 py-2 text-lg text-cyan-400 font-bold border border-cyan-400 hover:text-white hover:bg-cyan-400 inline-block rounded mb-3 disabled:opacity-75 disabled:text-white disabled:bg-cyan-400">
            Edit Profile
          </Link>
        </div>
      </div>
    </>
  );
}
