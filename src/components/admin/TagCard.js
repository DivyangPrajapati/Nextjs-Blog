"use client";
import { dateFormat } from "@/utils/dateUtil";
import Link from "next/link";

function TagCard({ tag }) {
  return (
    <tr>
      <td className="border-b border-slate-200 p-4">
        <Link className="text-cyan-400" href={`/admin/posts/tags/${tag.slug}/`}>
          {tag.title}
        </Link>
      </td>
      <td className="border-b border-slate-200 p-4">
        {dateFormat(tag.createdAt)}
      </td>
      <td className="border-b border-slate-200 p-4">
        <Link className="text-cyan-400" href={`/admin/posts/tags/${tag.slug}/`}>
          Edit
        </Link>
        &nbsp;/&nbsp;
        <Link
          className="text-cyan-400"
          onClick={() => confirm("Are you sure you want to delete this post?")}
          href={`/admin/posts/tags/${tag.slug}/delete`}
        >
          Delete
        </Link>
      </td>
    </tr>
  );
}

export default TagCard;
