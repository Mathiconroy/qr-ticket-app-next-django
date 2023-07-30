import EventForm from "./eventForm";

export default function EventList() {
  return (
    <div className="m-4 px-5 py-8 rounded-lg border bg-white drop-shadow-md">
      <h1 className="p-2">Events</h1>
      <EventForm />
    </div>
  );
}