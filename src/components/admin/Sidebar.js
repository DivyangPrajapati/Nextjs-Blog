"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="h-full w-64 fixed top-0 border-r border-slate-200 bg-white">
      <div className="w-full h-16 text-center border-b border-slate-200 flex items-center justify-center mb-6">
        <h1 className="text-3xl font-bold">
          <Link className="text-cyan-400" href={"/admin"}>
            NextBlog
          </Link>
        </h1>
      </div>

      <div className="mb-4">
        <p className="font-bold text-slate-60 mb-2 px-5">BLOG</p>
        <ul>
          <li>
            <Link
              href={"/admin/posts"}
              className={` ${
                pathname === "/admin/posts"
                  ? "bg-cyan-50"
                  : "text-slate-600 bg-transparent"
              } block px-5 py-3 transition-all hover:bg-cyan-50`}
            >
              All Posts
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/posts/create"}
              className={` ${
                pathname === "/admin/posts/create"
                  ? "bg-cyan-50"
                  : "text-slate-600 bg-transparent"
              } block px-5 py-3 transition-all hover:bg-cyan-50`}
            >
              New Post
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/posts/categories"}
              className={` ${
                pathname === "/admin/posts/categories"
                  ? "bg-cyan-50"
                  : "text-slate-600 bg-transparent"
              } block px-5 py-3 transition-all hover:bg-cyan-50`}
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/posts/tags"}
              className={` ${
                pathname === "/admin/posts/tags"
                  ? "bg-cyan-50"
                  : "text-slate-600 bg-transparent"
              } block px-5 py-3 transition-all hover:bg-cyan-50`}
            >
              Tags
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-bold text-slate-60 mb-2 px-5">USERS</p>
        <ul>
          <li>
            <Link
              href={"/admin/users"}
              className={` ${
                pathname === "/admin/users"
                  ? "bg-cyan-50"
                  : "text-slate-600 bg-transparent"
              } block px-5 py-3 transition-all hover:bg-cyan-50`}
            >
              All Users
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/users/create"}
              className={` ${
                pathname === "/admin/users/create"
                  ? "bg-cyan-50"
                  : "text-slate-600 bg-transparent"
              } block px-5 py-3 transition-all hover:bg-cyan-50`}
            >
              New User
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-bold text-slate-60 mb-2 px-5">Account</p>
        <ul>
          <li>
            <Link
              href={"/"}
              target="_blank"
              className={`text-slate-600 block px-5 py-3 transition-all hover:bg-cyan-50`}
            >
              Website
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/users/profile"}
              className={`${
                pathname === "/admin/users/profile"
                  ? "bg-cyan-50"
                  : "text-slate-600 bg-transparent"
              } text-slate-600 block px-5 py-3 transition-all hover:bg-cyan-50`}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href={"/logout"}
              className={` ${
                pathname === "/logout"
                  ? "bg-cyan-50"
                  : "text-slate-600 bg-transparent"
              } block px-5 py-3 transition-all hover:bg-cyan-50`}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
