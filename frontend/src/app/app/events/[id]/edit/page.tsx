import Title from "@/app/components/display/title";
import EventForm from "@/app/app/events/new/eventForm";

export default function editEvent({ params }: { params: { id: number } }) {
  return (
    <div>
      <Title>Edit event</Title>
      <EventForm mode={"edit"} eventId={params.id} />
    </div>
  );
}
