"use client"
import { Alt, Event as EventType } from "../../../eventList";
import { months, monLen, days, daysInMon } from "../../../grid";
import { useEvents } from "../../../context";
import { useState, useEffect } from "react";
import { getData } from "../../../actions";
import Image from 'next/image';

export default function Content({
    params,
}: {
    params: { day: number; eachMonth: string; year: number };
}) {
    const [dayEvents, setDayEvents] = useState<EventType[]>([]);
    const [imageSrc, setImageSrc] = useState<string>(''); // State variable for image source
    const events = useEvents();

    useEffect(() => {
	async function fetchData() {
	    try {
		const pic = await getData();
		setImageSrc(pic); // Set the fetched image source
	    } catch (error) {
		console.error(error);
	    }
	}

	const filteredEvents =
	    events &&
	    events.filter(
		(event) =>
		    event.destination ===
			`gen-${params.day}-${params.eachMonth}-${params.year}`
	    );
	setDayEvents(filteredEvents || []);
	fetchData();
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
		{imageSrc && (
		    <Image
			src={imageSrc}
			alt=''
			fill={true}
			quality={100}
			style={{ zIndex: -1 }} // Apply the desired z-index
		    />
		)}
		{dayEvents.map((event) => (
		    <Alt key={event.id} event={event} />
		))}
	    </>
	);
    }
}
