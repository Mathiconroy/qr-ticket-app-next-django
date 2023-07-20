'use client'

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
      </div>
    </div>
  );
}

function handleLogin(e: FormEvent) {
  const form = document.querySelector("#loginForm") as HTMLFormElement;
  const formData = new FormData(form);
  fetch("http://127.0.0.1:8000/app/login/", {
    method: "POST",
    body: formData,
  });
}