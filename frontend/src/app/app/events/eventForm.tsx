"use client";

import { FormEvent } from "react";
import axiosInstance from "@/app/axiosInstance";
import FormInput from "@/app/components/input/textInput";
import FormButton from "@/app/components/input/button";

export default function EventForm() {
  return (
    <form id="eventForm" onSubmit={(e) => handleEventForm(e)}>
      <FormInput type="text" id="name" label="Name" name="name" isTextarea={false}/>
      <FormInput type="datetime-local" label="Date" id="scheduled_datetime" name="scheduled_datetime" isTextarea={false}/>
      <FormInput id="description" label="Description" name="description" isTextarea={true}/>
      <FormButton text="Create event"></FormButton>
    </form>
  );
}

function handleEventForm(e: FormEvent) {
  e.preventDefault();
  const form = document.querySelector("#eventForm") as HTMLFormElement;
  const formData = new FormData(form);
  axiosInstance.post('events/', formData);
}
