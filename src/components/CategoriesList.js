import React from "react";
import Link from "next/link";

export default function CategoriesList({ categories }) {

    const renderCategory = (category) => (
        <li key={category._id} className="mt-2">
          <Link href={`/category/${category.slug}`}>{category.title}</Link>
          {categories
            .filter(
              (subCategory) =>
                subCategory.parentCategory &&
                subCategory.parentCategory._id === category._id
            )
            .map((subCategory) => (
              <ul className="pl-3 list-disc" key={subCategory._id}>
                {renderCategory(subCategory)}
              </ul>
            ))}
        </li>
      );

  return (
    <ul className="list-disc pl-4">
        {categories.filter((category) => !category.parentCategory).map(renderCategory)}
    </ul>
  );
}
