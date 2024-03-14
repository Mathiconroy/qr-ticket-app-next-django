import EventForm from "./eventForm";
import EventDashboard from "./eventDashboard";

export default function EventList() {
  return (
    <>
      <h1 className={"text-2xl"}>Create event</h1>
      <EventForm />
      <h1 className={"mb-1 text-2xl"}>Created events</h1>
      <EventDashboard />
    </>
  );
}
