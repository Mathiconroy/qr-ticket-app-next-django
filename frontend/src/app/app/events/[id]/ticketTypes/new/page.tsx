import Title from '@/app/components/display/title';
import TicketTypeForm from '@/app/app/events/[id]/ticketTypeForm';

export default function newTicketType({ params }: { params: { id: number } }) {
  return (
    <div>
      <Title>Create ticket type</Title>
      <TicketTypeForm event_id={params.id} />
    </div>
  );
}
