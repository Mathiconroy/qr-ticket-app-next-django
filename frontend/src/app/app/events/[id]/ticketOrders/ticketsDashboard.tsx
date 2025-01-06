'use client';

import useSWR, { Fetcher } from 'swr';
import axiosInstance from '@/axiosInstance';
import CardGrid from '@/components/display/cardGrid';
import Card from '@/components/display/card';
import { TicketOrderHeader } from '@/interfaces/interfaces';

export default function TicketDashboard({ eventId }: { eventId: number }) {
  const fetcher: Fetcher<TicketOrderHeader[], string> = async (url: string) => {
    const response = await axiosInstance.get(url);
    return response.data;
  };
  const { data, error, isLoading } = useSWR(`events/${eventId}/tickets/`, fetcher);

  if (error) return <div>An error has occurred.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <CardGrid>
        {data !== undefined
          ? data.map((ticketHeader: TicketOrderHeader) => {
              const markup = { __html: ticketHeader.qr_svg };
              return (
                <Card key={ticketHeader.id}>
                  <p>Buyer: {ticketHeader.buyer}</p>
                  <p>QR:</p>
                  <div className={'inline'} dangerouslySetInnerHTML={markup}></div>
                </Card>
              );
            })
          : null}
      </CardGrid>
    </div>
  );
}
