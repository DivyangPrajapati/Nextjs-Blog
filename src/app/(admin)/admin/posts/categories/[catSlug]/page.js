"use client";
import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import AlertBox from "@/components/AlertBox";
import hydrationFixUtil from "@/utils/hydrationFixUtil";

export default function EditCategory({params}) {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    parentCategory: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(false);
  const [noData, setNoData] = useState(false);
  const [categories, setCategories] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      const res = await fetch(`/api/posts/categories/${params.catSlug}`);

      const data = await res.json();

      if (data.hasOwnProperty("success") && !data.success) {
        setNoData(true);
        //notFound()
      }

      setInputData({
        ...inputData,
        title: data.title,
        description: data.description,
        parentCategory: data.parentCategory ? data.parentCategory : ''
      });
    };

    getCategory();

    const getCategories = async () => {
      const res = await fetch(`/api/posts/categories`);
      const data = await res.json();

      setCategories(data.categories);
    };

    getCategories();
  }, []);

  useEffect(() => {
    if( noData ) {
      notFound();
    }
  }, [noData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const res = await fetch(`/api/posts/categories/${params.catSlug}/edit`, {
        method: "PUT",
        body: JSON.stringify({
          title: inputData.title,
          description: inputData.description,
          parentCategory: inputData.parentCategory
        }),
      });
      //console.log(await res.json());
      
      if (res.status === 200) {
        setStatus("success");

        setTimeout(() => {
          router.push("/admin/posts/categories");
          router.refresh();
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error"); console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  if( ! hydrationFixUtil() ) {
    return null;
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-10 text-center">Edit Category</h2>

      {status === "success" && (
        <AlertBox
          status="success"
          message="Category successfully updated!"
        ></AlertBox>
      )}
      {status === "error" && (
        <AlertBox
          status="error"
          message="There was an error updating the category. Please try again later."
        ></AlertBox>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-gray-300 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 block w-full p-2.5"
            placeholder="Title"
            onChange={handleInputChange}
            value={inputData.title}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm font-medium">
          Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border border-gray-300 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 block w-full p-2.5"
            placeholder="Description"
            onChange={handleInputChange}
            value={inputData.description}
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="parentCategory" className="block mb-2 text-sm font-medium">
            parent Category
          </label>
          <select
            id="parentCategory"
            name="parentCategory"
            className="border border-gray-300 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 block w-full p-2.5"
            onChange={handleInputChange}
            value={inputData.parentCategory}
          >
            <option value={''}>--- Select ---</option>
            {categories && categories.length !== 0 && (
              categories.map((category) => (
                <option key={category._id} value={category._id}>{category.title}</option>
              ))
            )}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 text-lg text-cyan-400 font-bold border border-cyan-400 hover:text-white hover:bg-cyan-400 inline-block rounded mb-3 disabled:opacity-75 disabled:text-white disabled:bg-cyan-400"
        >
          {submitting ? "Saving ..." : "Save"}
        </button>
      </form>
    </>
  );
}
