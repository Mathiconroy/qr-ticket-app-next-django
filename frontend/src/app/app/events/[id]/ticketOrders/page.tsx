import Title from '@/components/display/title';
import TicketDashboard from '@/app/app/events/[id]/ticketOrders/ticketsDashboard';

export default async function TicketGenerator(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  return (
    <div>
      <Title>Your tickets</Title>
      <TicketDashboard eventId={params.id} />
    </div>
  );
}
