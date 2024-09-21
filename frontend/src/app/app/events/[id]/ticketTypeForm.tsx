'use client';

import FormButton from '@/app/components/input/button';
import FormInput from '@/app/components/input/textInput';
import { FormEvent } from 'react';
import axiosInstance from '@/app/axiosInstance';

export default function TicketTypeForm({ event_id }: { event_id: number }) {
  return (
    <form id="ticketTypeForm" onSubmit={(e) => handleEventForm(e)}>
      <FormInput name="event" id="event_id" type="hidden" value={String(event_id)} />
      <FormInput id="name" name="name" label="Ticket name" />
      <FormInput id="price" name="price" type="number" label="Price" />
      <FormButton text="Create" className={'mt-4'} />
    </form>
  );
}

function handleEventForm(e: FormEvent) {
  e.preventDefault();
  const form = document.querySelector('#ticketTypeForm') as HTMLFormElement;
  const formData = new FormData(form);
  axiosInstance.post(`events/${formData.get('event')}/ticketTypes/`, formData);
}
