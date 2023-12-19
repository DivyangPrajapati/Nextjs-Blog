"use client";

import { useState } from "react";

const CategoryList = ({ categories, selectedCategories, onCheckboxChange }) => {
  const renderCategory = (category) => (
    <li key={category._id} className="mt-1">
      <label>
        <input
          type="checkbox"
          name="categories"
          value={category._id}
          checked={selectedCategories.includes(category._id)}
          onChange={() => onCheckboxChange(category._id)}
          className="mr-1"
        />
        {category.title}
      </label>
      {categories
        .filter(
          (subCategory) =>
            subCategory.parentCategory &&
            subCategory.parentCategory._id === category._id
        )
        .map((subCategory) => (
          <ul className="pl-3" key={subCategory._id}>
            {renderCategory(subCategory)}
          </ul>
        ))}
    </li>
  );

  return (
    <ul>
      {categories
        .filter((category) => !category.parentCategory)
        .map(renderCategory)}
    </ul>
  );
};

export default CategoryList;
