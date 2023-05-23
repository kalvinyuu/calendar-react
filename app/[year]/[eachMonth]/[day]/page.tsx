"use client";
import { Alt } from "../../../eventList";
import {
  months,
  monLen,
  days,
  doomsDay,
  isLeap,
  daysInMon,
} from "../../../grid";
import { useEvents } from "../../../context";
import { useState, useEffect } from "react";

export default function Content({
  params,
}: {
  params: { day: number; eachMonth: string; year: number };
}) {
  const [dayEvents, setDayEvents] = useState([]);
  console.log(monLen);
  const events = useEvents();
  daysInMon(months, days);
  useEffect(() => {
    const filteredEvents = events.filter(
      (event) =>
        event.destination ==
        `gen-${params.day}-${params.eachMonth}-${params.year}`
    );
    setDayEvents(filteredEvents);
  }, [events]);
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
