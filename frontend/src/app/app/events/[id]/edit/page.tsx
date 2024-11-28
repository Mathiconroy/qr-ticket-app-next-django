import Title from '@/components/display/title';
import EventForm from '@/components/events/new/EventForm';

export default function editEvent({ params }: { params: { id: number } }) {
  return (
    <div>
      <Title>Edit event</Title>
      <EventForm mode={'edit'} eventId={params.id} />
    </div>
  );
}
