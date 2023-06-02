"use client";
import { useYear, useYearChange } from "./context";
import Link from "next/link";

export default function Year() {
  const year = useYear();
  const changeYear = useYearChange();

  if (year === null) {
    // Handle the case when year is null, such as showing a loading state or error message
    return <p>Loading...</p>;
  }

  return (
    <span className="flex flex-row center place-content-center bg-slate-600">
      <button
        className="text-indigo-800 border-2 border-slate-800 rounded-full px-2 mr-2" 
        onClick={() => {
          if (changeYear) {
            changeYear(year - 1);
          }
        }}
      >
         &lt;
      </button>
      <p className="text-2xl text-center text-indigo-800">
         Welcome to <span id="year">{year} </span>
      </p>
      <button
        className="text-indigo-800 border-2 border-slate-800 rounded-full px-2 mx-2"
        onClick={() => {
          if (changeYear) {
            changeYear(year + 1);
          }
        }}
      >
        &gt;
      </button>
      <Link href={`/${year}`} className="text-2xl text-center text-indigo-800">
         GO
      </Link>
    </span>
  );
}
