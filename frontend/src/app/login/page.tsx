"use client";

import { FormEvent } from "react";

export default function Home() {
  return (
    <div className="grid h-screen grid-cols-1 place-items-center bg-neutral-900">
      <div className="w-1/3 rounded-lg border border-zinc-800 bg-zinc-800 p-5">
        <p className="text-xl">Log In</p>
        <form id="loginForm" onSubmit={(e) => handleLogin(e)}>
          <label htmlFor="username" className="block py-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="block w-full rounded-lg bg-zinc-700 p-2"
          />
          <label htmlFor="password" className="block py-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="block w-full rounded-lg bg-zinc-700 p-2"
          />
          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-sky-700 p-2"
          >
            Log In
          </button>
          <p className="pt-3 text-center">New to Ticketify? Sign up.</p>
        </form>
        <button
          onClick={handleWhoAmI}
          type="submit"
          className="mt-5 w-full rounded-md bg-sky-700 p-2"
        >
          Who am I?
        </button>
      </div>
    </div>
  );
}

async function handleLogin(e: FormEvent) {
  e.preventDefault();
  const form = document.querySelector("#loginForm") as HTMLFormElement;
  const formData = new FormData(form);
  const res = await fetch("http://127.0.0.1:8000/api/api-token-auth/", {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  if (res.ok) {
    let json_response = await res.json();
    localStorage.setItem("token", json_response["token"]);
  } else {
    // TODO: Handle this case lol.
  }
}

async function handleWhoAmI() {
  const res = await fetch("http://127.0.0.1:8000/api/whoami/", {
    credentials: "include",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  console.log(res.json());
}
