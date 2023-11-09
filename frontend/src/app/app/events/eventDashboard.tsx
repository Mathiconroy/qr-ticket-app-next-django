"use client";

import InputButton from "@/app/components/input/button";
import axiosInstance from "@/app/axiosInstance";
import { Key } from "react";
import { useEffect, useState } from "react";

interface Event {
  id: Key,
  created_by: Number,
  name: string,
  scheduled_datetime: string,
  description: string,
  created_at: string,
  edited_at: string,
}

export default function EventDashboard() {
  const [eventData, setEventData] = useState<Event[]>();
  useEffect(() => {
    async function fetchEventData() {
      const eventResponse = await axiosInstance.get('events/');
      setEventData(eventResponse.data);
    }
    fetchEventData();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {eventData !== undefined ? eventData.map((event: Event) => <EventCard key={event.id} event={event} />) : ''}
    </div>
  );
}

function EventCard({
  event 
}: {
  event: Event 
}) {
  return (
    <div className="border-2 rounded-lg">
      <div className="p-2 font-bold text-lg">{event.name}</div>
      <div className="">Time</div>
      <div className="">Description: {event.description}</div>
      <div className="">Tickets sold</div>
      <div className="">Tickets left</div>
      <InputButton className="m-2" text="Edit"/>
      <InputButton text="Details"/>
    </div>
  );
}