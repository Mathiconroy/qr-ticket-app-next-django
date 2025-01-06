import Title from '@/components/display/title';
import TicketTypeForm from '@/components/events/ticketTypes/TicketTypeForm';

export default function newTicketType({ params }: { params: { id: number } }) {
  return (
    <div>
      <Title>Create ticket type</Title>
      <TicketTypeForm event_id={params.id} />
    </div>
  );
}
