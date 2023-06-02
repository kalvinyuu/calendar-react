"use client";
import { Alt, Event as EventType } from "../../../eventList";
import { months, monLen } from "../../../grid";
import { useEvents } from "../../../context";
import { useState, useEffect } from "react";
import { getData } from "../../../actions";
import Image from "next/image";

export default function Content({
  params,
}: {
  params: { day: number; eachMonth: string; year: number };
}) {
  const [dayEvents, setDayEvents] = useState<EventType[]>([]);
  const [tweetData, setTweetData] = useState<{
    image: string;
    tweet: string;
    user: string;
  }>({
    image: "",
    tweet: "",
    user: "",
  });

  const events = useEvents();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        setTweetData(data);
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
    Number(params.day) > monLen[months.findIndex((el) => el === params.eachMonth)]
  ) {
    return <h1>hi</h1>;
  } else {
    return (
      <>
        {tweetData.image && (
          <Image
            src={tweetData.image}
            alt=""
            fill={true}
            quality={100}
            style={{ zIndex: -1 }}
          />
        )}

        <div className="fixed top-16 left-4 right-4 bottom-4 flex items-start justify-start bg-gray-800 bg-opacity-75 border-2 border-gray-300 rounded-lg">
          <div className="text-white px-4 py-2 rounded-full font-bold mb-4 mx-auto">
            {`${params.day}/${params.eachMonth}/${params.year}`}
          </div>
          <table className="max-w-md p-8 space-y-4 fixed">
            {dayEvents.map((event) => (
              <tr className="p-8 fixed divide-y" key={event.id}>
                <Alt event={event} />
              </tr>
            ))}
          </table>
        </div>

     <div className="fixed bottom-4 right-4 flex items-center justify-end">
      <div className="bg-gray-700 rounded-lg px-4 py-2 border border-gray-800">
        <a href={tweetData.tweet} target="_blank" rel="noopener noreferrer" className="text-white mr-2">
          View Tweet
        </a>
        <a href={`https://nitter.net/${tweetData.user.substring(1)}`} target="_blank" rel="noopener noreferrer" className="text-white">
          {tweetData.user}
        </a>
      </div>
     </div>
      </>
    );
  }
}
