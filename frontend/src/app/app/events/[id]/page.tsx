'use client';

import EventDetail from '@/components/events/detail/EventDetail';
import { useTicketOrders, useTicketTypes } from '@/hooks/fetchHooks';

export default function EventDetails({ params }: { params: { id: number } }) {
  const { data: ticketTypesData } = useTicketTypes(params.id);
  const { data: ticketOrdersData } = useTicketOrders(params.id);

  return ticketTypesData === undefined || ticketOrdersData === undefined ? null : (
    <EventDetail ticketTypes={ticketTypesData} tickets={ticketOrdersData} />
  );
}
