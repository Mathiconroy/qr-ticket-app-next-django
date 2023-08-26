"use client";

import { FormEvent } from "react";
import axiosInstance from "@/app/axiosInstance";

export default function EventForm() {
  return (
    <form id="eventForm" onSubmit={(e) => handleEventForm(e)}>
      <EventFormInput type="text" id="name" label="Name" name="name" isTextarea={false}/>
      <EventFormInput type="datetime-local" label="Date" id="scheduled_datetime" name="scheduled_datetime" isTextarea={false}/>
      <EventFormInput id="description" label="Description" name="description" isTextarea={true}/>
      <button className="mt-3 rounded-lg bg-blue-500 text-white p-3">Create event</button>
    </form>
  );
}

function EventFormInput({
  name,
  id,
  type,
  label,
  isTextarea,
}: {
  name: string,
  id: string,
  type?: string,
  label: string,
  isTextarea: boolean,
}) {
  return (
    <div>
      <label htmlFor={id} className="block py-2">{label}</label>
      {isTextarea ? <textarea name={name} id={id} className="border w-full block rounded-lg p-2"/> : 
        <input type={type} name={name} id={id} className="border w-full block rounded-lg p-2"/>}
    </div>
  );
}

function handleEventForm(e: FormEvent) {
  e.preventDefault();
  const form = document.querySelector("#eventForm") as HTMLFormElement;
  const formData = new FormData(form);
  formData.append("created_by", "1");
  axiosInstance.post('events/', formData);
}
