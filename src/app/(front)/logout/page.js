"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function LoginUser() {
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
    <h2 className="text-3xl font-bold mb-10 text-center">Logging out...</h2>
  );
}
