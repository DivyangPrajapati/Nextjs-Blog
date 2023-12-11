"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await fetch(`/api/users/logout`);
    
        router.push("/");
        router.refresh();
    
      } catch (error) {
        console.log(error);
      }
    }

    logout();
  }, []);

  return (
    <></>
  );
}