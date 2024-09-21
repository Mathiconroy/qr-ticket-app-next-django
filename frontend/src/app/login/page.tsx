"use client";

import { FormEvent, useState } from "react";
import axiosInstance from "@/axiosInstance";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [whoAmI, setWhoAmI] = useState();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const form = document.querySelector("#loginForm") as HTMLFormElement;
    const formData = new FormData(form);
    const res = await axiosInstance.post("/api-token-auth/", formData);
    if (res.status >= 200 && res.status <= 299) {
      router.push("/app");
    }
  };

  const handleWhoAmI = async () => {
    const res = await axiosInstance.get("/whoami/");
    setWhoAmI(res.data.username);
  };

  return (
    <div className="grid h-screen grid-cols-1 place-items-center">
      <div className="w-1/4 rounded-lg border bg-white border-gray-400 p-5">
        <p className="text-center py-4 text-4xl font-bold mb-6">Login</p>
        <form id="loginForm" onSubmit={(e) => handleLogin(e)}>
          <input
            type="text"
            id="username"
            name="username"
            className="block w-full border-2 rounded-lg border-gray-200 mt-2 py-4 px-3"
            placeholder="Username"
          />
          <input
            type="password"
            id="password"
            name="password"
            className="block w-full border-2 rounded-lg border-gray-200 mt-5 py-4 px-3"
            placeholder="Password"
          />
          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-blue-400 p-2"
          >
            Log In
          </button>
          <p className="pt-3 text-center">New to Ticketify? Sign up.</p>
        </form>
        <button
          onClick={handleWhoAmI}
          type="submit"
          className="mt-5 w-full rounded-md bg-blue-400 p-2"
        >
          Who am I?
        </button>
        {whoAmI !== undefined ? <p>I am whoAmI</p> : null}
      </div>
    </div>
  );
}
