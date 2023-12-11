"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AlertBox from "@/components/AlertBox";
import GoBack from "@/components/admin/GoBack";

//import Image from 'next/image'

export default function CreatePost() {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    title: "",
    content: "",
    file: "",
    author: "650d58af5b1818ca118ce2af",
    status: "published",
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(false);

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
  }

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
      formData.append('title', inputData.title);
      formData.append('content', inputData.content);
      formData.append('status', inputData.status);
      formData.append('author', inputData.author);
      formData.append('thumbnail', inputData.file);
      
      const res = await fetch(`/api/posts/create`, {
        method: "POST",
        body: formData,
      });

      if (res.status === 201) {
        setStatus("success");

        setTimeout(() => {
          router.push("/admin/posts");
          router.refresh();
        }, 1000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
      console.log(error);
    } finally {
      setInputData({
        title: "",
        content: "",
        file: "",
        author: "650d58af5b1818ca118ce2af", 
        status: "published",
      });

      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-10">Create Post</h2>
      
      {status === "success" && <AlertBox status="success" message="Post successfully created!"></AlertBox>}
      {status === "error" && <AlertBox status="error" message="There was an error creating the post. Please try again later."></AlertBox>}

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
          <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium">Upload Image</label>
          <input type="file" name="thumbnail" id="thumbnail" onChange={handleThumbnailChanged} />
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
