'use client';

import { useState } from 'react';
import axiosInstance from '@/axiosInstance';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import useSWR, { Fetcher } from 'swr';
import { Event } from '@/interfaces/interfaces';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateTimePicker } from '@/components/ui/datetimepicker';

// TODO: This should probably be moved because I'll definitely use this elsewhere lol.
// This enum serves to give the classes to be used for each type of message.
enum MessageTypes {
  Error = 'border-red-500 bg-red-200 text-red-800',
  Warning = 'border-yellow-500 bg-yellow-200 text-yellow-800',
  Success = 'border-green-500 bg-green-200 text-green-800',
  Info = 'border-sky-500 bg-sky-200 text-sky-800'
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

interface CreateEventFields {
  name: string;
  scheduled_datetime: Date;
  description?: string;
}

const formSchema: z.ZodType<CreateEventFields> = z.object({
  name: z.string(),
  scheduled_datetime: z.date(),
  description: z.string().optional()
});

export default function EventForm({
  mode,
  eventId
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
    fetcher
  );

  const form = useForm<CreateEventFields>({
    resolver: zodResolver(formSchema)
  });

  async function onSubmit(formData: CreateEventFields) {
    try {
      if (mode === 'create') {
        const { data } = await axiosInstance.post(`events/`, formData);
        setMessageObject({
          message: 'Event created successfully.',
          messageType: MessageTypes.Success
        });
      } else if (mode === 'edit' && eventId !== undefined) {
        const { data } = await axiosInstance.patch(`events/${eventId}/`, formData);
        setMessageObject({
          message: 'Event edited successfully.',
          messageType: MessageTypes.Success
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessageObject({
          messages: error.response?.data,
          messageType: MessageTypes.Error
        });
      }
    }
  }

  return (
    <Form {...form}>
      {messageObject !== null ? <Messages messageObject={messageObject}></Messages> : null}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={'name'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder={'Name'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'scheduled_datetime'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DateTimePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'description'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder={'Description'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className={'mt-4'} type={'submit'}>
          Submit
        </Button>
      </form>
    </Form>
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
