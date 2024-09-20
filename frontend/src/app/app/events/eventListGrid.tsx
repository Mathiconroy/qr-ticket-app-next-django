"use client";

import InputButton from "@/app/components/input/button";
import Card from "@/app/components/display/card";
import CardGrid from "@/app/components/display/cardGrid";
import axiosInstance from "@/app/axiosInstance";
import { Event } from "@/app/interfaces/interfaces";
import useSWR, { Fetcher } from "swr";
import Link from "next/link";

export default function EventListTable() {
  const fetcher: Fetcher<Event[], string> = async (url: string) => {
    const response = await axiosInstance.get(url);
    return response.data;
  };
  const { data, error, isLoading } = useSWR("events/", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred.</div>;

  return (
    <CardGrid>
      {data !== undefined
        ? data.map((event: Event) => <EventCard key={event.id} event={event} />)
        : ""}
    </CardGrid>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <Card>
      <div className={"grid grid-cols-2"}>
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
        <div className={"flex items-center justify-end gap-2"}>
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
