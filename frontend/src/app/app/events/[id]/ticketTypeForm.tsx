import FormButton from "@/app/components/input/button";
import FormInput from "@/app/components/input/textInput";

export default function TicketTypeForm() {
  return (
    <form id="ticketTypeForm">
      <FormInput id="name" name="name" label="Ticket name" />
      <FormInput id="price" name="price" type="number" label="Price" />
      <FormButton text="Create" />
    </form>
  );
}