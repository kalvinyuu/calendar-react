"use client"
import { Alt } from "../../eventList";
import {months, monLen, year} from "../../grid";
import { EventsProvider, useEvents } from "../../context"; 
import {useState, useEffect} from "react"
 
function Content({ params }) {
    const [dayEvents, setDayEvents] = useState([]);
    const events = useEvents()
    useEffect(() => {
	const filteredEvents = events.filter(
	    (event) =>
		event.destination == `gen-${params.day}-${params.eachMonth}-${year}` 
	);
	setDayEvents(filteredEvents);
    }, [events]); 
    console.log(events)
    if (Number(params.day) < 1 || Number(params.day) > monLen[months.findIndex(el => el === params.eachMonth)]) { 
	return (
	    <h1>hi</h1>
	)
    }
    else {
	return (
	    <>
		{dayEvents.map((event) => (
		    <Alt
			event={event}
		    />
		))}
	    </>
    )}
}

export default function Placeholder({params}){
    return (
	<EventsProvider>
	    <Content params={params} />
	</EventsProvider>
    )
}
