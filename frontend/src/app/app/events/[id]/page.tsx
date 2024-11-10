'use client';

import CardGrid from '@/components/display/cardGrid';
import Card from '@/components/display/card';
import axiosInstance from '@/axiosInstance';
import { useState, useEffect } from 'react';
import FormButton from '@/components/input/button/FormButton';
import Link from 'next/link';
import { TicketType } from '@/interfaces/interfaces';
import Title from '@/components/display/title';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

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
    <Accordion type={'single'} collapsible>
      <AccordionItem value={'ticket-types'}>
        <AccordionTrigger>Ticket Types</AccordionTrigger>
        <AccordionContent>
          INSERT TICKET TYPES TABLE HERE
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={'tickets'}>
        <AccordionTrigger>Tickets</AccordionTrigger>
        <AccordionContent>
          INSERT TICKET TABLE HERE
        </AccordionContent>
      </AccordionItem>
    </Accordion>
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
