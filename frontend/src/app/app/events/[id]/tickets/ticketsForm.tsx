import FormInput from "@/app/components/input/textInput";
import FormButton from "@/app/components/input/button";

export default function TicketsForm() {
  return (
    <div>
      <form>
        <FormInput name={"owner"} id={'owner'} label={"Buyer's name"} />
        <FormButton text={'Generate tickets'} />
      </form>
    </div>
  );
}