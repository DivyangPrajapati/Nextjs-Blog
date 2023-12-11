"use client";
import { dateFormat } from "@/utils/dateUtil";
import Link from "next/link";

function CategoryCard({ category }) {
  return (
    <tr>
      <td className="border-b border-slate-200 p-4">
        <Link className="text-cyan-400" href={`/admin/posts/categories/${category.slug}/`}>
          {category.title}
        </Link>
      </td>
      <td className="border-b border-slate-200 p-4">{category.parentCategory?.title}</td>
      <td className="border-b border-slate-200 p-4">
        {dateFormat(category.createdAt)}
      </td>
      <td className="border-b border-slate-200 p-4">
        <Link className="text-cyan-400" href={`/admin/posts/categories/${category.slug}/`}>
          Edit
        </Link>
        &nbsp;/&nbsp;
        <Link
          className="text-cyan-400"
          onClick={() => confirm("Are you sure you want to delete this post?")}
          href={`/admin/posts/categories/${category.slug}/delete`}
        >
          Delete
        </Link>
      </td>
    </tr>
  );
}

export default CategoryCard;
