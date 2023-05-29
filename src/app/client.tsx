"use client";
import { useState, useEffect, useRef, RefObject } from "react";
import { createPortal } from "react-dom";
import { useEventsDispatch, useEvents } from "./context";
import Event, { EventProps } from "./eventList";
let altModalParent: HTMLElement;

export default function TableDate({
  uuid,
  dist,
}: {
  uuid: string;
  dist: string;
}) {
  const [dayEvents, setDayEvents] = useState<EventProps[]>([]);
  const events = useEvents();
  const [showModal, setShowModal] = useState(false);
  const modalParent =
    typeof window !== "undefined"
      ? document.getElementById(`${dist}-${uuid}`)
      : null;
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setShowModal(false));

  useEffect(() => {
    if (events !== null) {
      const filteredEvents: EventProps[] = events
        .filter(
          (event) =>
            event.destination === `${dist}-${uuid}` ||
            event.altDestination === `${dist}-${uuid}`
        )
        .map((event) => ({
          emoji: event.emoji,
          name: event.name,
          desc: event.desc,
          destination: modalParent,
          event,
          click: useOnClickOutside,
        }));
      setDayEvents(filteredEvents);
    }
  }, [events, dist, uuid]);

  return (
    <div id={`${dist}-${uuid}`}>
      <button
        onClick={() => setShowModal(true)}
        className="px-2 border-black border rounded-full m-2 w-min btn"
      >
        {uuid.match(/\d+/g)?.[0]}
      </button>
      {showModal &&
        modalParent &&
        createPortal(
          <div ref={ref}>
            <Modal abc={uuid} onClose={() => setShowModal(false)} dist={dist} />
          </div>,
          modalParent
        )}
      {dayEvents.map((event) => (
        <Event key={event.event.id} {...event} />
      ))}
    </div>
  );
}

//imported function from
type EventListener = (event: MouseEvent | TouchEvent) => void;

function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  handler: EventListener
): void {
  useEffect(() => {
    const listener: EventListener = (event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

function Modal({
  abc,
  onClose,
  dist,
}: {
  abc: string;
  onClose: () => void;
  dist: string;
}) {
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  let alt: string | null = null; // Initialize alt with null
  let altDist: string;
  const dispatch = useEventsDispatch();
  const events = useEvents();

  function opositer() {
    if (dist === "gen") {
      altDist = "cc";
    } else {
      altDist = "gen";
    }
    altModalParent = document.getElementById(
      `${altDist}-${abc}`
    ) as HTMLElement;
    altModalParent === null ? (alt = null) : (alt = `${altDist}-${abc}`);
  }

  function submit() {
    setDesc("");
    setEmoji("");
    setName("");
    if (dispatch) {
      dispatch({
        type: "added",
        id: events ? events.length : 0,
        emoji: emoji,
        name: name,
        desc: desc,
        destination: `${dist}-${abc}`,
        altDestination: alt || "", // Provide a default empty string if alt is null
      });
    }
  }
  return (
    <div className="flex-col absolute bg-slate-500 p-6 rounded-md space-y-2 overflow-visible">
      <p className="text-center"> {abc} </p>
      <div className="flex-col space-y-2">
        <input
          className="block"
          placeholder=" Symbol"
          id="emoji"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
        ></input>
        <input
          className="block"
          placeholder=" Event name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          className="block"
          placeholder=" Description"
          id="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></input>
        <div className="block space-x-4">
          <button
            className="bg-slate-100 py-1 px-2 rounded-lg"
            value="cancel"
            onClick={onClose}
          >
            {" "}
            Cancel{" "}
          </button>
          <button
            className="bg-slate-100 py-1 px-2 rounded-lg"
            value="default"
            onClick={() => {
              opositer();
              submit();
              onClose();
            }}
          >
            {" "}
            Confirm{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
