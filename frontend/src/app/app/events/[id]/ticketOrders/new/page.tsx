import TicketsForm from '@/app/app/events/[id]/ticketOrders/new/ticketsForm';
import Title from '@/components/display/title';

export default async function TicketGenerator(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  return (
    <div>
      <Title>Generate tickets</Title>
      <TicketsForm eventId={params.id} />
    </div>
  );
}
