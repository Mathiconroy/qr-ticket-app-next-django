import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { TicketOrderDetail, TicketOrderHeader, TicketType } from '@/interfaces/interfaces';
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
  ticketOrders
}: {
  ticketTypes: TicketType[];
  ticketOrders: TicketOrderHeader[];
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
                {ticketTypes.map((ticketType) => (
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
                  <TableHead>Buyer</TableHead>
                  <TableHead>Bought at</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ticketOrders.map((ticketOrder) => (
                  <TableRow>
                    <TableCell>{ticketOrder.buyer}</TableCell>
                    <TableCell>{new Date(ticketOrder.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
