'use client';
import { use } from 'react';

import EventDetail from '@/components/events/detail/EventDetail';
import { useTicketOrders, useTicketTypes } from '@/hooks/fetchHooks';

export default function EventDetails(props: { params: Promise<{ id: number }> }) {
  const params = use(props.params);
  const { data: ticketTypesData } = useTicketTypes(params.id);
  const { data: ticketOrdersData } = useTicketOrders(params.id);

  return ticketTypesData === undefined || ticketOrdersData === undefined ? null : (
    <EventDetail ticketTypes={ticketTypesData} ticketOrders={ticketOrdersData} />
  );
}
