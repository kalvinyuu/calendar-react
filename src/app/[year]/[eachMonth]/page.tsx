import { months, Month } from "../../grid";
import { EventsProvider } from "../../context";

interface PageProps {
  params: {
    year: number;
    eachMonth: string;
  };
}

export default function Page({ params }: PageProps) {
  let fragment;
  if (months.find((el) => el === params.eachMonth) === undefined) {
    fragment = <h1>404 Error</h1>;
  } else {
    fragment = (
      <Month
        i={months.findIndex((el) => el === params.eachMonth)}
        month={params.eachMonth}
        year={params.year}
      />
    );
  }

  return (
    <EventsProvider>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-screen h-screen p-16 bg-gray-800 bg-opacity-75 border-2 border-gray-300 rounded-lg">
	  <p className="text-center text-2xl text-indigo-900 pb-2">{params.eachMonth}</p>
          {fragment}
        </div>
      </div>
    </EventsProvider>
  );
}
