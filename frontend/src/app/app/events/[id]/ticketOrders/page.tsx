import TicketsForm from '@/app/app/events/[id]/ticketOrders/ticketsForm';
import Title from '@/components/display/title';
import TicketDashboard from '@/app/app/events/[id]/ticketOrders/ticketsDashboard';

export default function TicketGenerator({ params }: { params: { id: number } }) {
  return (
    <div>
      <Title>Generate tickets</Title>
      <TicketsForm eventId={params.id} />
      <Title>Your tickets</Title>
      <TicketDashboard eventId={params.id}></TicketDashboard>
    </div>
  );
}
