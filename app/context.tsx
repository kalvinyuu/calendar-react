"use client";
import { useReducer, useEffect, createContext, useContext, useState } from "react";
//import {initialEvents} from './client.tsx'
const EventContext = createContext(null);
const EventDispatchContext = createContext(null);

export function EventsProvider({ children }) {
    const [events, dispatch] = useReducer(eventReducer, initialEvents);
    //const [year, yearChange] = useState(date.getFullYear())
    useEffect(() => {
	
	events.length > 0 ? localStorage.setItem("my-events", JSON.stringify(events))
		      : localStorage.setItem("my-events", JSON.stringify([]));
    }, [events]);
    return (
	<EventContext.Provider value={events}>
	    <EventDispatchContext.Provider value={dispatch}>
		{children}
	    </EventDispatchContext.Provider>
	</EventContext.Provider>
    );

}

export function useEvents() {
  return useContext(EventContext);
}
export function useEventsDispatch() {
  return useContext(EventDispatchContext);
}

function eventReducer(events, action) {
  switch (action.type) {
    case "added": {
      return [
        ...events,
        {
          id: action.id,
          emoji: action.emoji,
          name: action.name,
          desc: action.desc,
          destination: action.destination,
          altDestination: action.altDestination,
        },
      ];
    }
    case "changed": {
      return events.map((ev) => {
        if (ev.id === action.event.id) {
          return action.event;
        } else {
          return ev;
        }
      });
    }
    case "deleted": {
      return events.filter((ev) => ev.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
if (typeof window !== 'undefined') {
    var initialEvents = JSON.parse(localStorage.getItem("my-events"));
} else {
    console.log('we are running on the server');
}


 
