"use client";
import CardGrid from "@/app/components/display/cardGrid";
import Card from "@/app/components/display/card";
import TicketTypeForm from "./ticketTypeForm";
import axiosInstance from "@/app/axiosInstance";
import { useState, useEffect } from "react";

interface TicketType {
  id: number;
  name: string;
  price: number;
}

export default function EventDetails({ params }: { params: { id: number } }) {
  const [eventData, setEventData] = useState<TicketType[]>();
  useEffect(() => {
    async function fetchEventData() {
      const eventResponse = await axiosInstance.get(
        `events/${params.id}/ticketTypes/`,
      );
      setEventData(eventResponse.data);
    }

    fetchEventData();
  }, []);
  return (
    <>
      <h1>Event with id {params.id}</h1>
      <TicketTypeForm event_id={params.id} />
      <CardGrid>
        {eventData !== undefined
          ? eventData.map((event: TicketType) => (
              <Card key={event.id}>
                <div>{event.name}</div>
              </Card>
            ))
          : ""}
      </CardGrid>
    </>
  );
}
