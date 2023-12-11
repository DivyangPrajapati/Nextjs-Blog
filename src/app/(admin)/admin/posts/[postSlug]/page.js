"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AlertBox from "@/components/AlertBox";
import { notFound } from "next/navigation";
import GoBack from "@/components/admin/GoBack";
import Image from "next/image";

//import Image from 'next/image'

export default function EditPost({ params }) {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    title: "",
    content: "",
    file: "",
    status: "published",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`/api/posts/${params.postSlug}`);

      const data = await res.json();

      if (data.hasOwnProperty("success") && !data.success) {
        //notFound();
        setNoData(true);
      }

      setInputData({
        title: data.title,
        content: data.content,
        file: "",
        status: data.status,
      });

      setPreviewImg(data.thumbnail);
    };

    getPost();
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

  const handleThumbnailChanged = (e) => {
    const file = e.target.files?.[0];
    setInputData({
      ...inputData,
      file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      /* const res = await fetch(`/api/posts/create`, {
        method: "POST",
        body: JSON.stringify({
          title: inputData.title,
          content: inputData.content,
          status: inputData.status,
          author: "650d58af5b1818ca118ce2af",
          thumbnail: file
        }),
      }); */
      const formData = new FormData();
      formData.append("title", inputData.title);
      formData.append("content", inputData.content);
      formData.append("status", inputData.status);
      formData.append("thumbnail", inputData.file);

      const res = await fetch(`/api/posts/${params.postSlug}/edit`, {
        method: "PUT",
        body: formData,
      });

      if (res.status === 200) {
        setStatus("success");

        setTimeout(() => {
          router.push("/admin/posts");
          router.refresh();
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-10">Edit Post</h2>

      {status === "success" && (
        <AlertBox
          status="success"
          message="Post successfully updated!"
        ></AlertBox>
      )}
      {status === "error" && (
        <AlertBox
          status="error"
          message="There was an error updating the post. Please try again later."
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
            placeholder="Post title"
            onChange={handleInputChange}
            value={inputData.title}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block mb-2 text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="border border-gray-300 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 block w-full p-2.5"
            placeholder="Post content"
            onChange={handleInputChange}
            value={inputData.content}
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <div className="flex">
            <div className="w-20 h-20 mr-4 bg-slate-50 rounded">
              {previewImg && (
                <Image
                  className="w-full h-full block object-cover rounded"
                  src={previewImg}
                  alt={previewImg}
                  width={80}
                  height={80}
                />
              )}
            </div>
            <div>
              <label
                htmlFor="thumbnail"
                className="block mb-2 text-sm font-medium"
              >
                Upload Image
              </label>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                onChange={handleThumbnailChanged}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="status" className="block mb-2 text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="border border-gray-300 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 block w-full p-2.5"
            onChange={handleInputChange}
            value={inputData.status}
            required
          >
            <option value="published">Publish</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 mr-4 text-lg text-cyan-400 font-bold border border-cyan-400 hover:text-white hover:bg-cyan-400 inline-block rounded mb-3 disabled:opacity-75 disabled:text-white disabled:bg-cyan-400"
        >
          {submitting ? "Saving ..." : "Save"}
        </button>

        <GoBack />
      </form>
    </>
  );
}
