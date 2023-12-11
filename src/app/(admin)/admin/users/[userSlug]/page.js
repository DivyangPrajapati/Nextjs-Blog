"use client";
import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import AlertBox from "@/components/AlertBox";
import hydrationFixUtil from "@/utils/hydrationFixUtil";

export default function EditUser({params}) {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    role: "subscriber",
    status: 1,
    password: "",
    cpassword: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`/api/users/${params.userSlug}`);

      const data = await res.json();

      if (data.hasOwnProperty("success") && !data.success) {
        setNoData(true);
        //notFound()
      }

      setInputData({
        ...inputData,
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status,
      });
    };

    getUser();
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

    if (inputData.password !== inputData.cpassword) {
      alert('Password and Confirm password does not match!');
      setSubmitting(false);
      return false;
    }

    try {
      const res = await fetch(`/api/users/${params.userSlug}/edit`, {
        method: "PUT",
        body: JSON.stringify({
          name: inputData.name,
          email: inputData.email,
          role: inputData.role,
          status: inputData.status,
          password: inputData.password
        }),
      });
      //console.log(await res.json());
      if (res.status === 200) {
        setStatus("success");

        setTimeout(() => {
          router.push("/admin/users");
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
      <h2 className="text-3xl font-bold mb-10 text-center">Edit User</h2>

      {status === "success" && (
        <AlertBox
          status="success"
          message="User successfully updated!"
        ></AlertBox>
      )}
      {status === "error" && (
        <AlertBox
          status="error"
          message="There was an error updating the user. Please try again later."
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
          <label htmlFor="role" className="block mb-2 text-sm font-medium">
            Role
          </label>
          <select
            id="role"
            name="role"
            className="border border-gray-300 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 block w-full p-2.5"
            onChange={handleInputChange}
            value={inputData.role}
            required
          >
            <option value={'administrator'}>Administrator</option>
            <option value={'subscriber'}>subscriber</option>
            </select>
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
            value={inputData.status ? 1 : 0}
            required
          >
            <option value={0}>Inactive</option>
            <option value={1}>Active</option>
            </select>
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
