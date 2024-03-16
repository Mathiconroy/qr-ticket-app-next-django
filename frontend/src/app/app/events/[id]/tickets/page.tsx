import Card from "@/app/components/display/card";
import TicketsForm from "@/app/app/events/[id]/tickets/ticketsForm";
import Title from "@/app/components/display/title";

export default function TicketGenerator({
  params,
}: {
  params: { id: number };
}) {
  return (
    <div>
      <Title>Generate tickets</Title>
      <TicketsForm eventId={params.id} />
    </div>
  );
}
