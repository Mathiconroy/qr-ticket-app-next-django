'use client';

import { FormEvent, useState } from 'react';
import axiosInstance from '@/app/axiosInstance';
import FormInput from '@/app/components/input/textInput';
import FormButton from '@/app/components/input/button';
import axios from 'axios';
import useSWR, { Fetcher } from 'swr';
import { Event } from '@/app/interfaces/interfaces';

// TODO: This should probably be moved because I'll definitely use this elsewhere lol.
// This enum serves to give the classes to be used for each type of message.
enum MessageTypes {
  Error = 'border-red-500 bg-red-200 text-red-800',
  Warning = 'border-yellow-500 bg-yellow-200 text-yellow-800',
  Success = 'border-green-500 bg-green-200 text-green-800',
  Info = 'border-sky-500 bg-sky-200 text-sky-800',
}

interface Message {
  [index: string]: string[];
}

/*
 * Messages are rendered as an unordered list with a single item.
 * message will be rendered as a single item.
 * Example:
 * The object {message: "My message."} will be rendered as:
 * - My message.
 * messages will be rendered as an unordered list with a list item per key in the messages object.
 * Example:
 * The object {messages: {a: "Message a", b: "Message b"}} will be rendered as:
 * - A
 *    - Message a
 * - B
 *    - Message b
 * messageType will determine the Tailwind CSS classes to be used for the message box.
 * */
interface MessageObject {
  messages?: Message;
  message?: string;
  messageType: MessageTypes;
}

export default function EventForm({
  mode,
  eventId,
}: {
  mode: 'edit' | 'create';
  eventId?: number;
}) {
  const [messageObject, setMessageObject] = useState<MessageObject | null>(null);

  const fetcher: Fetcher<Event, string> = async (url: string) => {
    const response = await axiosInstance.get(url);
    return response.data;
  };
  const { data } = useSWR<Event>(
    mode === 'edit' && eventId !== undefined ? `events/${eventId}/` : null,
    fetcher,
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = document.querySelector('#eventForm') as HTMLFormElement;
    const formData = new FormData(form);
    try {
      if (mode === 'create') {
        const { data } = await axiosInstance.post(`events/`, formData);
        setMessageObject({
          message: 'Event edited successfully.',
          messageType: MessageTypes.Success,
        });
      } else if (mode === 'edit' && eventId !== undefined) {
        const { data } = await axiosInstance.patch(`events/${eventId}/`, formData);
        setMessageObject({
          message: 'Event created successfully.',
          messageType: MessageTypes.Success,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessageObject({
          messages: error.response?.data,
          messageType: MessageTypes.Error,
        });
      }
    }
  }

  // TODO: Figure out what the fuck to do with the dates.
  return (
    <div>
      {messageObject !== null ? <Messages messageObject={messageObject}></Messages> : null}
      <form id="eventForm" onSubmit={(e) => handleSubmit(e)}>
        <FormInput
          type="text"
          id="name"
          label="Name"
          name="name"
          value={data !== undefined ? data.name : undefined}
        />
        <FormInput
          type="date"
          label="Date"
          id="scheduled_datetime"
          name="scheduled_datetime"
          value={'1995-12-17'}
        />
        <FormInput
          type="time"
          label="Time"
          id="scheduled_datetime"
          name="scheduled_datetime"
          value={'15:24'}
        />
        <FormInput id="description" label="Description" name="description" isTextarea={true} />
        <FormButton text="Create event" className={'mt-4'} type={'submit'} />
      </form>
    </div>
  );
}

function Messages({ messageObject }: { messageObject: MessageObject }) {
  return (
    <div className={'rounded-md border ' + messageObject.messageType}>
      {messageObject.messages !== undefined
        ? Object.keys(messageObject.messages!).map((keyName: string, keyIndex: number) => (
            <ul key={keyIndex} className={'ml-6 list-disc'}>
              <li>{keyName.replace(/\b\w/g, (l: string) => l.toUpperCase())}</li>
              {messageObject.messages !== undefined
                ? messageObject.messages[keyName].map((message: string) => (
                    <ul key={keyName} className={'ml-6 list-disc'}>
                      <li key={keyIndex}>{message}</li>
                    </ul>
                  ))
                : null}
            </ul>
          ))
        : null}
      {messageObject.message !== undefined ? (
        <ul className={'ml-6 list-disc'}>
          <li>{messageObject.message}</li>
        </ul>
      ) : null}
    </div>
  );
}
