'use client';
import CardGrid from '@/app/components/display/cardGrid';
import Card from '@/app/components/display/card';
import TicketTypeForm from './ticketTypeForm';
import axiosInstance from '@/app/axiosInstance';
import { useState, useEffect } from 'react';
import FormButton from '@/app/components/input/button';
import Link from 'next/link';
import { TicketType } from '@/app/interfaces/interfaces';
import Title from '@/app/components/display/title';

export default function EventDetails({ params }: { params: { id: number } }) {
  const [ticketTypeData, setTicketTypeData] = useState<TicketType[]>();
  useEffect(() => {
    async function fetchTicketTypeData() {
      const eventResponse = await axiosInstance.get(`events/${params.id}/ticketTypes/`);
      setTicketTypeData(eventResponse.data);
    }
    fetchTicketTypeData();
  }, [params.id]);
  return (
    <>
      <div className={'grid grid-cols-2 items-center gap-4'}>
        <Title>Ticket types</Title>
        <div className={'flex items-center justify-end gap-2'}>
          <Link href={`${params.id}/ticketTypes/new/`}>
            <FormButton text={'+ Create Ticket Type'} />
          </Link>
          <Link href={`${params.id}/tickets/new/`}>
            <FormButton text={'+ Create Ticket Order'} />
          </Link>
        </div>
      </div>

      <div className={'mt-3'}>
        <CardGrid>
          {ticketTypeData !== undefined
            ? ticketTypeData.map((ticketType: TicketType) => (
                <Card key={ticketType.id}>
                  <div>Name: {ticketType.name}</div>
                  <div>Price: {ticketType.price}</div>
                  <Link href={`${params.id}/tickets`}>
                    <FormButton text={'See tickets'} />
                  </Link>
                </Card>
              ))
            : ''}
        </CardGrid>
      </div>
    </>
  );
}
