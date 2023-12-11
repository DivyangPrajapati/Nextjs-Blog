"use client";
import { dateFormat } from "@/utils/dateUtil";
import Link from "next/link";

function UserCard({ user }) {
  return (
    <tr>
      <td className="border-b border-slate-200 p-4 capitalize">
        <Link className="text-cyan-400" href={`/admin/users/${user.slug}/`}>
          {user.name}
        </Link>
      </td>
      <td className="border-b border-slate-200 p-4">{user.email}</td>
      <td className="border-b border-slate-200 p-4 capitalize">{user.role}</td>
      <td className="border-b border-slate-200 p-4 capitalize">
        {user.status ? "Active" : "Inactive"}
      </td>
      <td className="border-b border-slate-200 p-4">
        <Link className="text-cyan-400" href={`/admin/users/${user.slug}/`}>
          Edit
        </Link>
        {user.role !== "administrator" && (
          <>
            &nbsp;/&nbsp;
            <Link
              className="text-cyan-400"
              onClick={() =>
                confirm("Are you sure you want to delete this user?")
              }
              href={`/admin/users/${user.slug}/delete`}
            >
              Delete
            </Link>
          </>
        )}
      </td>
    </tr>
  );
}

export default UserCard;
