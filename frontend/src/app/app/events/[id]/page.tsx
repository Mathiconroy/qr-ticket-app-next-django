'use client';

import EventDetail from '@/components/events/detail/EventDetail';
import useSWR from 'swr';

export default function EventDetails({ params }: { params: { id: number } }) {
  const { data: ticketTypesData } = useSWR(`/events/${params.id}/ticketTypes/`);
  const { data: ticketsData } = useSWR(`/events/${params.id}/tickets/`);

  return (
    <>
      <EventDetail ticketTypes={ticketTypesData} tickets={ticketsData} />
    </>
  );
}
