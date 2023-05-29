"use client";
import { Alt, Event as EventType } from "../../../eventList";
import { months, monLen, days, daysInMon } from "../../../grid";
import { useEvents } from "../../../context";
import { useState, useEffect } from "react";
import { getData } from "../../../actions";
export default function Content({
  params,
}: {
  params: { day: number; eachMonth: string; year: number };
}) {
  const [dayEvents, setDayEvents] = useState<EventType[]>([]); // Use the correct Event type
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
    async function fetchData() {
  try {
    const data = await getData(); 
    console.log(data); // Output the returned data
  } catch (error) {
    console.error(error);
  }
}

fetchData();
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
