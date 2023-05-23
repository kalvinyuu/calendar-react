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
    fragment = <h1> 404 Error</h1>;
  } else
    fragment = (
      <Month
        i={months.findIndex((el) => el === params.eachMonth)}
        month={params.eachMonth}
        year={params.year}
      />
    );
  return <EventsProvider>{fragment}</EventsProvider>;
}
