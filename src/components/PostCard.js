import { getExcerpt } from "@/utils/contentUtil";
import Link from "next/link";
import React from "react";
import Image from "next/image";

function PostCard({ post }) {
  return (
    <div className="border rounded-xl border-slate-200">
      <div className="w-full h-64 bg-slate-50 rounded-t-xl">
        {post.thumbnail && (
          <Link href={`/${post.slug}`}>
            <Image
              className="w-full h-full block object-cover rounded-t-xl"
              src={post.thumbnail}
              alt={post.title}
              width={500}
              height={256}
            />
          </Link>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          <Link href={`/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="mb-6">{getExcerpt(post.content)}</p>
        <p className="text-sm italic mb-10">{post.author?.name}</p>
      </div>
    </div>
  );
}

export default PostCard;
