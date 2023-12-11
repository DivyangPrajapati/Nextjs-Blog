"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AlertBox from "@/components/AlertBox";
import hydrationFixUtil from "@/utils/hydrationFixUtil";

export default function LoginUser() {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    email: "",
    password: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('There was an error logging in. Please try again later.');

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
      const res = await fetch(`/api/users/login`, {
        method: "POST",
        body: JSON.stringify({
          email: inputData.email,
          password: inputData.password
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        if( data.user.role === 'administrator') {
          router.push("/admin");
        } else {
          router.push("/");
        }
        router.refresh();
      } else {
        setStatus("error");

        if(res.status === 400) {
          setErrorMessage(data.message);
        }
      }
    } catch (error) {
      setStatus("error"); 
      console.log(error);
    } finally {
      setInputData({
        email: "",
        password: "",
      });

      setSubmitting(false);
    }
  };

  if( ! hydrationFixUtil() ) {
    return null;
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-10 text-center">Login User</h2>

      {status === "error" && (
        <AlertBox
          status="error"
          message={errorMessage}
        ></AlertBox>
      )}

      <form onSubmit={handleSubmit}>
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

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 text-lg text-cyan-400 font-bold border border-cyan-400 hover:text-white hover:bg-cyan-400 inline-block rounded mb-3 disabled:opacity-75 disabled:text-white disabled:bg-cyan-400"
        >
          {submitting ? "Login ..." : "Login"}
        </button>
      </form>
    </>
  );
}
