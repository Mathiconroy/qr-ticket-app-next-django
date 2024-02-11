import EventForm from "./eventForm";
import EventDashboard from "./eventDashboard";

export default function EventList() {
  return (
    <>
      <h1 className="p-2">Events</h1>
      <EventForm />
      <EventDashboard />
    </>
  );
}
