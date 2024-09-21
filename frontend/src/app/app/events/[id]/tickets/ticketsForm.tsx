'use client';
import FormInput from '@/app/components/input/textInput';
import FormButton from '@/app/components/input/button';
import { FormEvent, useEffect, useState } from 'react';
import axiosInstance from '@/app/axiosInstance';
import { TicketOrderDetail, TicketType } from '@/app/interfaces/interfaces';
import Card from '@/app/components/display/card';

export default function TicketsForm({ eventId }: { eventId: number }) {
  const [ticketTypeData, setTicketTypeData] = useState<TicketType[]>();
  useEffect(() => {
    async function fetchTicketTypeData() {
      const eventResponse = await axiosInstance.get(`events/${eventId}/ticketTypes/`);
      setTicketTypeData(eventResponse.data);
    }
    fetchTicketTypeData();
  }, [eventId]);
  return (
    <div>
      <form
        id="ticketsForm"
        onSubmit={(e: FormEvent<HTMLFormElement>): void => {
          handleFormSubmit(e, eventId);
        }}
      >
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
        <FormButton text={'Generate tickets'} type={'submit'} />
      </form>
    </div>
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
        ticket_type_id: Number(pair[0]),
        amount: Number(pair[1]),
      });
    }
  }
  formData.set('tickets', JSON.stringify(tickets));
  axiosInstance.post(`/events/${eventId}/tickets/`, formData);
}
