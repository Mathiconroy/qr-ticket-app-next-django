"use client";

import { FormEvent, useState } from "react";
import axiosInstance from "@/app/axiosInstance";
import FormInput from "@/app/components/input/textInput";
import FormButton from "@/app/components/input/button";
import axios from "axios";

enum MessageTypes {
  Error = "border-red-500 bg-red-200 text-red-800",
  Warning = "border-yellow-500 bg-yellow-200 text-yellow-800",
  Success = "border-green-500 bg-green-200 text-green-800",
  Info = "border-sky-500 bg-sky-200 text-sky-800",
}

interface Message {
  [index: string]: string[];
}

interface MessageObject {
  messages: Message;
  messageType: MessageTypes;
}

export default function EventForm() {
  const [messageObject, setMessageObject] = useState<MessageObject | null>(
    null,
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = document.querySelector("#eventForm") as HTMLFormElement;
    const formData = new FormData(form);
    try {
      const { data } = await axiosInstance.post("events/", formData);
      setMessageObject({
        messages: { event: ["Event created successfully."] },
        messageType: MessageTypes.Success,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        setMessageObject({
          messages: error.response?.data,
          messageType: MessageTypes.Error,
        });
      }
    }
  }

  return (
    <div>
      {messageObject !== null ? (
        <Messages messageObject={messageObject}></Messages>
      ) : null}
      <form id="eventForm" onSubmit={(e) => handleSubmit(e)}>
        <FormInput type="text" id="name" label="Name" name="name" />
        <FormInput
          type="datetime-local"
          label="Date"
          id="scheduled_datetime"
          name="scheduled_datetime"
        />
        <FormInput
          id="description"
          label="Description"
          name="description"
          isTextarea={true}
        />
        <FormButton text="Create event" className={"mt-4"} type={"submit"} />
      </form>
    </div>
  );
}

function Messages({ messageObject }: { messageObject: MessageObject }) {
  return (
    <div className={"rounded-md border " + messageObject.messageType}>
      {Object.keys(messageObject.messages).map(
        (keyName: string, keyIndex: number) => (
          <ul key={keyIndex} className={"ml-6 list-disc"}>
            <li>{keyName.replace(/\b\w/g, (l: string) => l.toUpperCase())}</li>
            {messageObject.messages[keyName].map((message: string) => (
              <ul key={keyName} className={"ml-6 list-disc"}>
                <li key={keyIndex}>{message}</li>
              </ul>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}
