"use client";
import { useEventsDispatch } from "./context";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";
//import useOnClickOutside from "./client.tsx";

export default function Event({ event, emoji, name, desc, destination, click }) {
  const [isEditing, setEditing] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const ref = useRef();
  click(ref, () => setVisible(false));
  const dispatch = useEventsDispatch();
  //localStorageUploader()
  let EventContent;
  if (isEditing) {
    //edit
    EventContent = (
	<span className="flex flex-col absolute">
        <input
          value={emoji}
          onChange={(e) => {
            dispatch({
              type: "changed",
              event: {
                ...event,
                emoji: e.target.value,
              },
            });
          }}
        />
          <input
            value={name}
            onChange={(e) => {
              dispatch({
                type: "changed",
                event: {
                  ...event,
                  name: e.target.value,
                },
              });
            }}
          />
          <input
            value={desc}
            onChange={(e) => {
              dispatch({
                type: "changed",
                event: {
                  ...event,
                  desc: e.target.value,
                },
              });
            }}
          />
	  <span>
          <button onClick={() => setEditing(false)}>save</button>
          <button
            onClick={() => {
              dispatch({
                type: "deleted",
                id: event.id,
              });
            }}
          >
            remove
          </button>
	</span>
      </span>
    );
  } else {
    EventContent = (
      <>
        <a
          onClick={() => setVisible(true)}
          className="rounded border border-black inline max-h-11 whitespace-nowrap"
        >
          {emoji}
        </a>
        {isVisible &&
         createPortal(
              <div ref={ref} className="overflow-visible absolute bg-white p-8">
              <div className="">
                <h3>{name}</h3>
                <p>{desc}</p>
              </div>
              <div className="">
                <button onClick={() => setEditing(true)}>edit</button>
                <button
                  onClick={() => {
                    dispatch({
                      type: "deleted",
                      id: event.id,
                    });
                  }}
                >
                  remove
                </button>
              </div>
              </div>,
            destination
          )}
      </>
    );
  }

  return <>{EventContent}</>;
}

export function Alt ({event}) { 
  const [isEditing, setEditing] = useState(false);
    const dispatch = useEventsDispatch();
  if (isEditing) {
    var EventContent = (
	<span className="flex flex-col absolute">
        <input
          value={event.emoji}
          onChange={(e) => {
            dispatch({
              type: "changed",
              event: {
                ...event,
                emoji: e.target.value,
              },
            });
          }}
        />
          <input
            value={event.name}
            onChange={(e) => {
              dispatch({
                type: "changed",
                event: {
                  ...event,
                  name: e.target.value,
                },
              });
            }}
          />
          <input
            value={event.desc}
            onChange={(e) => {
              dispatch({
                type: "changed",
                event: {
                  ...event,
                  desc: e.target.value,
                },
              });
            }}
          />
	  <span>
          <button onClick={() => setEditing(false)}>save</button>
          <button
            onClick={() => {
              dispatch({
                type: "deleted",
                id: event.id,
              });
            }}
          >
            remove
          </button>
	</span>
      </span>
    );
  } else {
    var EventContent = (
      <>
          {event.emoji}
              <div className="">
                <h3>{event.name}</h3>
                <p>{event.desc}</p>
              </div>
              <div className="">
                <button onClick={() => setEditing(true)}>edit</button>
                <button
                  onClick={() => {
                    dispatch({
                      type: "deleted",
                      id: event.id,
                    });
                  }}
                >
                  remove
                </button>
              </div>
      </>
    );
  }
    return <>{EventContent}</>
}
