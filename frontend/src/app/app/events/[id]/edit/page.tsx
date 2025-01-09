import Title from '@/components/display/title';
import EventForm from '@/components/events/new/EventForm';

export default async function editEvent(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  return (
    <div>
      <Title>Edit event</Title>
      <EventForm eventId={params.id} />
    </div>
  );
}
