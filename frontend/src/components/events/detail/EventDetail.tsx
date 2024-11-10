import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger
} from '@/components/ui/accordion';

export default function EventDetail() {
  return (
    <>
      <Accordion type={'single'} collapsible>
        <AccordionItem value={'ticket-types'}>
          <AccordionTrigger>Ticket Types</AccordionTrigger>
          <AccordionContent>INSERT TICKET TYPES TABLE HERE</AccordionContent>
        </AccordionItem>
        <AccordionItem value={'tickets'}>
          <AccordionTrigger>Tickets</AccordionTrigger>
          <AccordionContent>INSERT TICKET TABLE HERE</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
