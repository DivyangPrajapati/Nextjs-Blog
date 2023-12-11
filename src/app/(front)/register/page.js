"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AlertBox from "@/components/AlertBox";
import hydrationFixUtil from "@/utils/hydrationFixUtil";

export default function RegisterUser() {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    if (inputData.password !== inputData.cpassword) {
      alert('Password and Confirm password does not match!');
      setSubmitting(false);
      return false;
    }

    try {
      const res = await fetch(`/api/users/create`, {
        method: "POST",
        body: JSON.stringify({
          name: inputData.name,
          email: inputData.email,
          password: inputData.password
        }),
      });

      if (res.status === 201) {
        setStatus("success");

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error"); console.log(error);
    } finally {
      setInputData({
        name: "",
        email: "",
        password: "",
        cpassword: ""
      });

      setSubmitting(false);
    }
  };

  if( ! hydrationFixUtil() ) {
    return null;
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-10 text-center">Register User</h2>

      {status === "success" && (
        <AlertBox
          status="success"
          message="User successfully created!"
        ></AlertBox>
      )}
      {status === "error" && (
        <AlertBox
          status="error"
          message="There was an error creating the user. Please try again later."
        ></AlertBox>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-gray-300 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 block w-full p-2.5"
            placeholder="Name"
            onChange={handleInputChange}
            value={inputData.name}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 block w-full p-2.5"
            placeholder="Email"
            onChange={handleInputChange}
            value={inputData.email}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-gray-300 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 block w-full p-2.5"
            placeholder="Password"
            onChange={handleInputChange}
            value={inputData.password}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="cpassword" className="block mb-2 text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            className="border border-gray-300 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 block w-full p-2.5"
            placeholder="Confirm Password"
            onChange={handleInputChange}
            value={inputData.cpassword}
            required
          />
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
