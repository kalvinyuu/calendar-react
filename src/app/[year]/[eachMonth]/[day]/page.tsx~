"use client";
import { Alt, Event as EventType } from "../../../eventList";
import { months, monLen, days, daysInMon } from "../../../grid";
import { useEvents } from "../../../context";
import { useState, useEffect } from "react";

export default function Content({
  params,
}: {
  params: { day: number; eachMonth: string; year: number };
}) {
  const [dayEvents, setDayEvents] = useState<EventType[]>([]); // Use the correct Event type
  console.log(monLen);
  const events = useEvents();
  daysInMon(days);
  useEffect(() => {
    const filteredEvents =
      events &&
      events.filter(
        (event) =>
          event.destination ===
          `gen-${params.day}-${params.eachMonth}-${params.year}`
      );
    setDayEvents(filteredEvents || []);
  }, [events, params]);

  if (
    Number(params.day) < 1 ||
    Number(params.day) >
      monLen[months.findIndex((el) => el === params.eachMonth)]
  ) {
    return <h1>hi</h1>;
  } else {
    return (
      <>
        {dayEvents.map((event) => (
          <Alt event={event} />
        ))}
      </>
    );
  }
}
