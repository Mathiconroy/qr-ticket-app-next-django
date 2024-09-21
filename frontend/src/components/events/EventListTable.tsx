'use client';

import InputButton from '@/components/input/button';
import Card from '@/components/display/card';
import axiosInstance from '@/axiosInstance';
import { Event } from '@/interfaces/interfaces';
import useSWR, { Fetcher } from 'swr';
import Link from 'next/link';
import { BsPencilSquare, BsSearch } from 'react-icons/bs';

export default function EventListTable() {
  const fetcher: Fetcher<Event[], string> = async (url: string) => {
    const response = await axiosInstance.get(url);
    return response.data;
  };
  const { data, error, isLoading } = useSWR<Event[]>('events/', fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred.</div>;

  return (
    <table className={'table-auto w-full'}>
      <thead className={'border-b'}>
        <tr className={'text-left'}>
          <th>Name</th>
          <th>Date</th>
          <th>Details</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {data !== undefined &&
          data.map((event) => (
            <tr key={event.id} className={'border-b'}>
              <td>{event.name}</td>
              <td>{event.scheduled_datetime}</td>
              <td>
                <button className={'p-2'}>
                  <BsSearch />
                </button>
              </td>
              <td>
                <button className={'p-2'}>
                  <BsPencilSquare />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <Card>
      <div className={'grid grid-cols-2'}>
        <div>
          <div className="py-2 text-xl font-bold">{event.name}</div>
          <div className="">Date: {event.scheduled_datetime}</div>
          {event.description ? (
            <div className="">Description: {event.description}</div>
          ) : (
            <div></div>
          )}
          {/*
            TODO: Add the calculations for these fields.
          */}
          <div className="">Tickets sold:</div>
          <div className="">Tickets left:</div>
        </div>
        <div className={'flex items-center justify-end gap-2'}>
          <Link href={`events/${event.id}/edit/`}>
            <InputButton text="Edit" />
          </Link>
          <Link href={`events/${event.id}/ticketTypes/`}>
            <InputButton text="Ticket types" />
          </Link>
          <Link href={`events/${event.id}/tickets/`}>
            <InputButton text="Ticket orders" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
