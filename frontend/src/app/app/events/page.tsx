import EventForm from "./eventForm";
import EventDashboard from "./eventDashboard";
import Title from "@/app/components/display/title";

export default function EventList() {
  return (
    <>
      <Title>Create event</Title>
      <EventForm />
      <Title>Created events</Title>
      <EventDashboard />
    </>
  );
}
