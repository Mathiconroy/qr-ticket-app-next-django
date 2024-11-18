import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { TicketOrderDetail, TicketType } from '@/interfaces/interfaces';
import { MoveLeft } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
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
          <AccordionContent className={'pb-0'}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ticketTypes?.map((ticketType) => (
                  <TableRow>
                    <TableCell>{ticketType.name}</TableCell>
                    <TableCell>{ticketType.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={'tickets'}>
          <AccordionTrigger>Ticket Orders</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
