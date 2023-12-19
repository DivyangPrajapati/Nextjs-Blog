"use client";
import { dateFormat } from "@/utils/dateUtil";
import Link from "next/link";
import Image from "next/image";

function PostCard({ post }) {
  return (
    <tr>
      <td className="border-b border-slate-200 p-4">
        <div className="w-14 h-14 bg-slate-50 rounded">
          <Link className="text-cyan-400" href={`/admin/posts/${post.slug}/`}>
            {post.thumbnail && (
              <Image
                className="w-full h-full block object-cover rounded"
                src={post.thumbnail}
                alt={post.title}
                width={56}
                height={56}
              />
            )}
          </Link>
        </div>
      </td>
      <td className="border-b border-slate-200 p-4">
        <Link className="text-cyan-400" href={`/admin/posts/${post.slug}/`}>
          {post.title}
        </Link>
      </td>
      <td className="border-b border-slate-200 p-4 w-52">
        {post.categories &&
          post.categories.map((category) => category.title).join(", ")}
      </td>
      <td className="border-b border-slate-200 p-4">{post.author?.name}</td>
      <td className="border-b border-slate-200 p-4 capitalize">
        {post.status}
      </td>
      <td className="border-b border-slate-200 p-4">
        {dateFormat(post.createdAt)}
      </td>
      <td className="border-b border-slate-200 p-4">
        <Link target="_blank" className="text-cyan-400" href={`/${post.slug}/`}>
          View
        </Link>
        &nbsp;/&nbsp;
        <Link className="text-cyan-400" href={`/admin/posts/${post.slug}/`}>
          Edit
        </Link>
        &nbsp;/&nbsp;
        <Link
          className="text-cyan-400"
          onClick={() => confirm("Are you sure you want to delete this post?")}
          href={`/admin/posts/${post.slug}/delete`}
        >
          Delete
        </Link>
      </td>
    </tr>
  );
}

export default PostCard;
