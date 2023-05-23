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
    <span className="flex flex-row center place-content-center">
      <button
        className="text-2xl text-center pt-6"
        onClick={() => {
          if (changeYear) {
            changeYear(year - 1);
          }
        }}
      >
        &lt;
      </button>
      <p className="text-2xl text-center pt-6">
        Welcome to <span id="year">{year}</span>
      </p>
      <button
        className="text-2xl text-center pt-6"
        onClick={() => {
          if (changeYear) {
            changeYear(year - 1);
          }
        }}
      >
        &gt;
      </button>
      <Link href={`/${year}`} className="text-2xl text-center pt-6">
        GO
      </Link>
    </span>
  );
}
