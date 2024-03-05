import Card from "@/app/components/display/card";
import TicketsForm from "@/app/app/events/[id]/tickets/ticketsForm";

export default function TicketGenerator({
  params,
}: {
  params: { id: number };
}) {
  return (
    <div>
      Generate tickets
      <TicketsForm eventId={params.id} />
    </div>
  );
}
