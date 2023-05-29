"use client";
import {
  useReducer,
  useEffect,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

//import {initialEvents} from './client.tsx'
const EventContext = createContext<Event[] | null>(null);
const EventDispatchContext = createContext<React.Dispatch<Action> | null>(null);
const YearContext = createContext<number | null>(null);
const YearChangeContext = createContext<React.Dispatch<
  React.SetStateAction<number>
> | null>(null);

export function EventsProvider({ children }: { children: ReactNode }) {
  const date = new Date();
  const [events, dispatch] = useReducer(eventReducer, initialEvents);
  const [year, yearChange] = useState<number>(date.getFullYear());
  useEffect(() => {
    events.length > 0
      ? localStorage.setItem("my-events", JSON.stringify(events))
      : localStorage.setItem("my-events", JSON.stringify([]));
  }, [events]);
  return (
    <YearContext.Provider value={year}>
      <YearChangeContext.Provider value={yearChange}>
        <EventContext.Provider value={events}>
          <EventDispatchContext.Provider value={dispatch}>
            {children}
          </EventDispatchContext.Provider>
        </EventContext.Provider>
      </YearChangeContext.Provider>
    </YearContext.Provider>
  );
}

export function useYear() {
  return useContext(YearContext);
}
export function useYearChange() {
  return useContext(YearChangeContext);
}
export function useEvents() {
  return useContext(EventContext);
}
export function useEventsDispatch() {
  return useContext(EventDispatchContext);
}

type Event = {
  id: number;
  emoji: string;
  name: string;
  desc: string;
  destination: string;
  altDestination: string;
};

type Action =
  | {
      type: "added";
      id: number;
      emoji: string;
      name: string;
      desc: string;
      destination: string;
      altDestination: string;
    }
  | { type: "changed"; event: Event }
  | { type: "deleted"; id: number };

function eventReducer(events: Event[], action: Action): Event[] {
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
  }
}

let initialEvents: Event[] = [];

if (typeof window !== "undefined") {
  const storedEvents = localStorage.getItem("my-events");
  if (storedEvents) {
    initialEvents = JSON.parse(storedEvents) as Event[];
  }
}
