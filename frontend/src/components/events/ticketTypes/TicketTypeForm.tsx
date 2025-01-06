'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { post } from '@/hooks/fetchHooks';

interface TicketTypeFields {
  event: number;
  name: string;
  price: number;
}

const schema: z.ZodType<TicketTypeFields> = z.object({
  event: z.coerce.number(),
  name: z.string(),
  price: z.coerce.number().min(1)
});

export default function TicketTypeForm({ event_id }: { event_id: number }) {
  const form = useForm<TicketTypeFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      event: event_id
    }
  });

  async function onSubmit(formData: TicketTypeFields) {
    await post(`/events/${formData.event}/ticketTypes/`, formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={'event'}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type={'hidden'} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'name'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder={'Name'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'price'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type={'number'} placeholder={'Price'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type={'submit'} className={'mt-4'}>
          Create
        </Button>
      </form>
    </Form>
  );
}
