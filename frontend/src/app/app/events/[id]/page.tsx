'use client';

import axiosInstance from '@/axiosInstance';
import { useState, useEffect } from 'react';
import { TicketType } from '@/interfaces/interfaces';
import EventDetail from '@/components/events/detail/EventDetail';

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
      <EventDetail />
    </>
  );
}
