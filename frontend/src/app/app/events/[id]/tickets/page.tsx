import Card from '@/app/components/display/card';
import TicketsForm from '@/app/app/events/[id]/tickets/ticketsForm';
import Title from '@/app/components/display/title';
import TicketDashboard from '@/app/app/events/[id]/tickets/ticketsDashboard';

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
