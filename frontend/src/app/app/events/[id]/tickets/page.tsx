import Card from "@/app/components/display/card";
import TicketsForm from "@/app/app/events/[id]/tickets/ticketsForm";

export default function TicketGenerator() {
  return(
    <div>
      Generate tickets
      <TicketsForm />
    </div>
  );
}