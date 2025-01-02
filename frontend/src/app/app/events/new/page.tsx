import EventForm from '@/components/events/new/EventForm';
import Title from '@/components/display/title';

export default function newEvent() {
  return (
    <div>
      <Title>Create event</Title>
      <EventForm />
    </div>
  );
}
