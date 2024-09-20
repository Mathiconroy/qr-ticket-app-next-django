import EventForm from "@/app/app/events/new/eventForm";
import Title from "@/app/components/display/title";

export default function newEvent() {
  return (
    <div>
      <Title>Create event</Title>
      <EventForm mode={"create"} />
    </div>
  );
}
