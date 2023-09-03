import InputButton from "@/app/components/input/button";

export default function EventDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <EventCard />
    </div>
  );
}

function EventCard() {
  return (
    <div className="border-2 rounded-lg">
      <div className="p-2 font-bold text-lg">Event Name</div>
      <div className="">Time</div>
      <div className="">Description</div>
      <div className="">Tickets sold</div>
      <div className="">Tickets left</div>
      <InputButton className="m-2" text="Edit"/>
      <InputButton text="Details"/>
    </div>
  )
}