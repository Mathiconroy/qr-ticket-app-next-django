'use client';

import FormInput from '@/components/input/textInput';
import axiosInstance from '@/axiosInstance';
import { TicketOrderDetail, TicketType } from '@/interfaces/interfaces';
import Card from '@/components/display/card';
import { Button } from '@/components/ui/button';
import { useTicketTypes } from '@/hooks/fetchHooks';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';

export default function TicketsForm({ eventId }: { eventId: number }) {
  const { data: ticketTypeData } = useTicketTypes(eventId);
  const form = useForm();
  const onSubmit = async (formData) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={'mb-2 grid grid-cols-3 grid-rows-1'}>
          <div></div>
          <Card>
            <FormInput name={'buyer'} id={'buyer'} label={'Buyer'} />
          </Card>
        </div>
        {ticketTypeData !== undefined
          ? ticketTypeData.map((ticketType: TicketType) => (
              <div key={ticketType.id} className={'mb-2 grid grid-cols-3 grid-rows-1'}>
                <div></div>
                <Card>
                  <div className={'grid grid-cols-2 grid-rows-1'}>
                    <label>{`${ticketType.name} - $${ticketType.price}`}</label>
                    <input
                      type={'number'}
                      name={String(ticketType.id)}
                      className={'rounded-lg border px-2'}
                    />
                  </div>
                </Card>
              </div>
            ))
          : ''}
        <Button type={'submit'}>Generate Tickets</Button>
      </form>
    </Form>
  );
}

function handleFormSubmit(e: FormEvent<HTMLFormElement>, eventId: number): void {
  e.preventDefault();
  const form = document.querySelector('#ticketsForm') as HTMLFormElement;
  const formData: FormData = new FormData(form);
  let tickets: TicketOrderDetail[] = [];
  for (const pair of formData.entries()) {
    if (pair[0] !== 'buyer') {
      tickets.push({
        ticket_type: Number(pair[0]),
        amount: Number(pair[1])
      });
    }
  }
  formData.set('tickets', JSON.stringify(tickets));
  axiosInstance.post(`/events/${eventId}/tickets/`, formData);
}
