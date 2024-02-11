"use client";

import InputButton from "@/app/components/input/button";
import Card from "@/app/components/display/card";
import CardGrid from "@/app/components/display/cardGrid";
import axiosInstance from "@/app/axiosInstance";
import { Key } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Event {
  id: Key;
  created_by: Number;
  name: string;
  scheduled_datetime: string;
  description: string;
  created_at: string;
  edited_at: string;
}

export default function EventDashboard() {
  const [eventData, setEventData] = useState<Event[]>();
  useEffect(() => {
    async function fetchEventData() {
      const eventResponse = await axiosInstance.get("events/");
      setEventData(eventResponse.data);
    }

    fetchEventData();
  }, []);
  return (
    <CardGrid>
      {eventData !== undefined
        ? eventData.map((event: Event) => (
            <EventCard key={event.id} event={event} />
          ))
        : ""}
    </CardGrid>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <Card>
      <div className="p-2 text-lg font-bold">{event.name}</div>
      <div className="">Time</div>
      <div className="">Description: {event.description}</div>
      <div className="">Tickets sold</div>
      <div className="">Tickets left</div>
      <Link href={`/app/events/${event.id}`}>
        <InputButton className="m-2" text="Edit" />
      </Link>
      <Link href={`/app/events/${event.id}`}>
        <InputButton text="Details" />
      </Link>
    </Card>
  );
}
