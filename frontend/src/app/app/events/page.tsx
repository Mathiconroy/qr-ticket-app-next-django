import EventForm from "./eventForm";
import EventDashboard from "./eventDashboard";

export default function EventList() {
  return (
    <div className="mx-4 px-5 py-5 rounded-lg border bg-white drop-shadow-md">
      <h1 className="p-2">Events</h1>
      <EventForm />
      <EventDashboard />
    </div>
  );
}