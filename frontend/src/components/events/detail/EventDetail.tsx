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
import { useModal } from '@/hooks/modalHooks';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { downloader } from '@/hooks/fetchHooks';

async function downloadTicket(orderId: TicketOrderHeader['id']) {
  downloader(`/tickets/${orderId}/download`);
}

export default function EventDetail({
  ticketTypes,
  ticketOrders
}: {
  ticketTypes: TicketType[];
  ticketOrders: TicketOrderHeader[];
}) {
  const { isOpen, openModal, closeModal, toggleModal } = useModal();
  const [selectedOrder, setSelectedOrder] = useState<TicketOrderHeader>();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={toggleModal}>
        <DialogContent>
          <DialogHeader>
            {selectedOrder !== undefined ? (
              <div className={'flex flex-col content-center justify-center'}>
                <DialogTitle>
                  <div className={'text-2xl font-bold text-center py-3'}>Order Details</div>
                </DialogTitle>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket Type</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          {
                            ticketTypes.find((ticketType) => ticketType.id === ticket.ticket_type)
                              ?.name
                          }
                        </TableCell>
                        <TableCell>{ticket.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div
                  className={'flex justify-center'}
                  dangerouslySetInnerHTML={{ __html: selectedOrder.qr_svg }}
                ></div>
                <Button onClick={() => downloadTicket(selectedOrder.id)}>Download</Button>
              </div>
            ) : null}
          </DialogHeader>
        </DialogContent>
      </Dialog>
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
                  <TableRow key={ticketType.id}>
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
                  <TableHead>Order ID</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Bought at</TableHead>
                  <TableHead>Redeemed</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ticketOrders.map((ticketOrder) => (
                  <TableRow key={ticketOrder.id}>
                    <TableCell>{ticketOrder.id}</TableCell>
                    <TableCell>{ticketOrder.buyer}</TableCell>
                    <TableCell>{new Date(ticketOrder.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge>{ticketOrder.is_redeemed ? 'Yes' : 'No'}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          setSelectedOrder(ticketOrder);
                          openModal();
                        }}
                      >
                        Details
                      </Button>
                    </TableCell>
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
