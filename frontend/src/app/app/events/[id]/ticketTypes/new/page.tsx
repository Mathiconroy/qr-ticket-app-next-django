import Title from '@/components/display/title';
import TicketTypeForm from '@/components/events/ticketTypes/TicketTypeForm';

export default async function newTicketType(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  return (
    <div>
      <Title>Create ticket type</Title>
      <TicketTypeForm event_id={params.id} />
    </div>
  );
}
