import { useEventsDispatch } from "./context";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";
//import useOnClickOutside from "./client.tsx";

export type Event = {
  id: number;
  emoji: string;
  name: string;
  desc: string;
  destination: string;
  altDestination: string;
};

export type EventProps = {
  event: Event;
  emoji: string;
  name: string;
  desc: string;
  destination: HTMLElement | null;
  click: (ref: React.RefObject<HTMLElement>, callback: () => void) => void;
};

export default function Event({
  event,
  emoji,
  name,
  desc,
  destination,
  click,
}: EventProps) {
  const [isEditing, setEditing] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  click(ref, () => setVisible(false));
  const dispatch = useEventsDispatch();
  let EventContent: JSX.Element;
  if (isEditing) {
    EventContent = (
      <span className="flex flex-col absolute">
        <input
          value={emoji}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (dispatch) {
              dispatch({
                type: "changed",
                event: {
                  ...event,
                  emoji: e.target.value,
                },
              });
            }
          }}
        />
        <input
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (dispatch) {
              dispatch({
                type: "changed",
                event: {
                  ...event,
                  name: e.target.value,
                },
              });
            }
          }}
        />
        <input
          value={desc}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (dispatch) {
              dispatch({
                type: "changed",
                event: {
                  ...event,
                  desc: e.target.value,
                },
              });
            }
          }}
        />
        <span>
          <button onClick={() => setEditing(false)}>save</button>
          <button
            onClick={() => {
              if (dispatch) {
                dispatch({
                  type: "deleted",
                  id: event.id,
                });
              }
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
          destination &&
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
                    if (dispatch) {
                      dispatch({
                        type: "deleted",
                        id: event.id,
                      });
                    }
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

type AltProps = {
  event: Event;
};

export function Alt({ event }: AltProps) {
  const [isEditing, setEditing] = useState(false);
  const dispatch = useEventsDispatch();

  const handleEmojiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedEvent = { ...event, emoji: e.target.value };
    if (dispatch) {
      dispatch({ type: "changed", event: updatedEvent });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedEvent = { ...event, name: e.target.value };
    if (dispatch) {
      dispatch({ type: "changed", event: updatedEvent });
    }
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedEvent = { ...event, desc: e.target.value };
    if (dispatch) {
      dispatch({ type: "changed", event: updatedEvent });
    }
  };

  const handleRemove = () => {
    if (dispatch) {
      dispatch({ type: "deleted", id: event.id });
    }
  };

  const handleSave = () => {
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex flex-col absolute">
          <input value={event.emoji} onChange={handleEmojiChange} />
          <input value={event.name} onChange={handleNameChange} />
          <input value={event.desc} onChange={handleDescChange} />
          <div>
            <button onClick={handleSave}>save</button>
            <button onClick={handleRemove}>remove</button>
          </div>
        </div>
      ) : (
        <div>
          {event.emoji}
          <div>
            <h3>{event.name}</h3>
            <p>{event.desc}</p>
          </div>
          <div>
            <button onClick={handleEdit}>edit</button>
            <button onClick={handleRemove}>remove</button>
          </div>
        </div>
      )}
    </div>
  );
}
