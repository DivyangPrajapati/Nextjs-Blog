import React from "react";
import CategoriesList from "./CategoriesList";

async function getCategories() {
  const res = await fetch(`${process.env.BASE_URL}/api/posts/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data.categories;
}

async function Sidebar() {
  const categories = await getCategories();
  return (
    <div className="w-full md:w-1/3 xl:w-1/4 p-6 shadow">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      <CategoriesList categories={categories}></CategoriesList>
    </div>
  );
}

export default Sidebar;
