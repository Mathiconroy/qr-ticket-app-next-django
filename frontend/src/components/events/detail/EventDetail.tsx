import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Event, TicketOrderDetail, TicketType } from '@/interfaces/interfaces';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';

export default function EventDetail({
  ticketTypes,
  tickets
}: {
  ticketTypes: TicketType[];
  tickets: TicketOrderDetail[];
}) {
  return (
    <>
      <Button asChild>
        <Link href={'/app/events'}>
          <MoveLeft /> Go back
        </Link>
      </Button>
      <Accordion type={'single'} collapsible>
        <AccordionItem value={'ticket-types'}>
          <AccordionTrigger>Ticket Types</AccordionTrigger>
          <AccordionContent>INSERT TICKET TYPES TABLE HERE</AccordionContent>
        </AccordionItem>
        <AccordionItem value={'tickets'}>
          <AccordionTrigger>Tickets</AccordionTrigger>
          <AccordionContent>INSERT TICKET TABLE HERE</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
