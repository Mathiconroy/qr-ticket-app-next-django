"use client";
import InputButton from "@/app/components/input/button";
import Card from "@/app/components/display/card";
import CardGrid from "@/app/components/display/cardGrid";
import axiosInstance from "@/app/axiosInstance";
import { Event } from "@/app/interfaces/interfaces";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EventListGrid() {
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
          <Link href={`/app/events/${event.id}`}>
            <InputButton text="Edit" />
          </Link>
          <Link href={`/app/events/${event.id}`}>
            <InputButton text="Details" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
