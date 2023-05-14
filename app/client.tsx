"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useEventsDispatch, useEvents } from "./context.tsx";
import Event from "./eventList.tsx";
let altModalParent: HTMLElement;

export default function TableDate(props: any) {
  //App.js add initialEvents as local storage
  const [dayEvents, setDayEvents] = useState([]);
    const events = useEvents();
  const [showModal, setShowModal] = useState(false);
  let uuid = props.uuid;
  let today = props.today;
    let dist = props.dist;
    if (typeof window !== 'undefined') {
	var modalParent = document.getElementById(`${dist}-${uuid}`);
	var mod = document.getElementById("modal");
    }
  const ref = useRef();
  useOnClickOutside(ref, () => setShowModal(false));
  useEffect(() => {
    const filteredEvents = events.filter(
      (event) =>
        event.destination == `${dist}-${uuid}` ||
        event.altDestination == `${dist}-${uuid}`
    );
    setDayEvents(filteredEvents);
  }, [events, modalParent]);
  return (
      <>
	  <td
              id={`${dist}-${uuid}`}
              className="border-t border-black whitespace-nowrap "
	  >
              <button
		  onClick={() => setShowModal(true)}
		  className="px-2 border-black border rounded-full m-2 w-min btn"
              >
		  {today}
              </button>
              {showModal &&
               createPortal(
		   <div ref={ref}>
		       <Modal
			   abc={uuid}
			   onClose={() => setShowModal(false)}
			   dist={dist}
		       />
		   </div>,
		   modalParent
              )}
              {dayEvents.map((event) => (
		  <Event
		      key={event.id}
		      emoji={event.emoji}
		      name={event.name}
		      desc={event.desc}
		      event={event}
		      destination={modalParent}
		      click={useOnClickOutside}
		  />
              ))}
	  </td>
      </>
  );
}
//imported function from stackOverflow
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
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
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because the passed-in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

function Modal({ abc, onClose, dist }) {
  //AddList.js
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  let alt: string;
  let altDist: string;
    const dispatch = useEventsDispatch();
    const events = useEvents();
  function opositer() {
    if (dist === "gen") {
      altDist = "cc";
    } else {
      altDist = "gen";
    }
    altModalParent = document.getElementById(`${altDist}-${abc}`);
    altModalParent === null ? (alt = null) : (alt = `${altDist}-${abc}`);
  }
  function submit() {
    setDesc("");
    setEmoji("");
    setName("");
    dispatch({
      type: "added",
      id: events.length,
      emoji: emoji,
      name: name,
      desc: desc,
      destination: `${dist}-${abc}`,
      altDestination: `${alt}`,
    });
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
