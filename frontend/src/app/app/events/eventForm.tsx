"use client";

import { FormEvent } from "react";

export default function EventForm() {
  return (
    <form id="eventForm" onSubmit={(e) => handleEventForm(e)}>
      <EventFormInput type="text" id="name" name="Name" isTextarea={false}/>
      <EventFormInput type="text" id="date" name="Date" isTextarea={false}/>
      <EventFormInput id="description" name="Description" isTextarea={true}/>
      <button className="mt-3 rounded-lg bg-blue-500 text-white p-3">Create event</button>
    </form>
  );
}

function EventFormInput({
  name,
  id,
  type,
  isTextarea,
}: {
  name: string,
  id: string,
  type?: string,
  isTextarea: boolean,
}) {
  return (
    <div>
      <label htmlFor={id} className="block py-2">{name}</label>
      {isTextarea ? <textarea name={name} id={id} className="border w-full block rounded-lg p-2"/> : 
        <input type={type} name={name} id={id} className="border w-full block rounded-lg p-2"/>}
    </div>
  );
}

function handleEventForm(e: FormEvent) {
  e.preventDefault();
}
