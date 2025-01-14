'use client';

import Card from '@/components/display/card';
import { Button } from '@/components/ui/button';
import { post, useTicketTypes } from '@/hooks/fetchHooks';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TicketNumberInput } from '@/components/input/ticketNumberInput';

interface Ticket {
  ticket_type_id: number;
  amount: number;
}

interface TicketOrderFormFields {
  buyer: string;
  tickets: Ticket[];
}

const ticketSchema: z.ZodType<Ticket> = z.object({
  ticket_type_id: z.coerce.number(),
  amount: z.coerce.number()
});

const schema: z.ZodType<TicketOrderFormFields> = z.object({
  buyer: z.string().trim().min(1, 'Required'),
  tickets: z.array(ticketSchema).refine((value) => value.some((ticket) => ticket.amount > 0), {
    message: 'Empty orders are not allowed'
  })
});

export default function TicketsForm({ eventId }: { eventId: number }) {
  const { data: ticketTypeData } = useTicketTypes(eventId);
  const form = useForm<TicketOrderFormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      buyer: ''
    }
  });
  const onSubmit = async (formData: TicketOrderFormFields) => {
    await post(`/events/${eventId}/ticketOrders/`, formData);
  };

  console.log(form.getValues());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={'mb-2 grid grid-cols-3 grid-rows-1'}>
          <div></div>
          <Card>
            <FormField
              name={'buyer'}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buyer</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        </div>

        {ticketTypeData?.map((ticketType, index) => (
          <div key={ticketType.id} className={'mb-2 grid grid-cols-3 grid-rows-1'}>
            <FormField
              name={`tickets.${index}.ticket_type_id`}
              control={form.control}
              defaultValue={ticketType.id}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type={'hidden'} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Card>
              <FormField
                name={`tickets.${index}.amount`}
                control={form.control}
                defaultValue={0}
                render={({ field }) => (
                  <FormItem>
                    <div className={'flex items-center justify-between gap-4 text-xl'}>
                      <FormLabel className={'text-xl'}>{ticketType.name}</FormLabel>
                      <div className={'text-xl'}>${ticketType.price}</div>
                      <FormControl className={'justify-self-end'}>
                        <TicketNumberInput
                          onChange={field.onChange}
                          value={field.value}
                          ref={field.ref}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
          </div>
        ))}
        <Button type={'submit'}>Generate Tickets</Button>
      </form>
    </Form>
  );
}
