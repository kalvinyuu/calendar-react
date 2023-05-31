import TableDate from "./client";
import Link from "next/link";
//import { useYear } from "./context";

export const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const days = [28 || 29, 30, 31];
export const doomsDay = [3, 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12];
export let monLen: number[] = [];
let firstDay: number[];
let monCal: any;

export function isLeap(x: number) {
  if (x % 4 == 0) {
    days[0] = 29;
    doomsDay[0] += 1;
    doomsDay[1] += 1;
  } else {
    days[0] = 28;
  }
}

export function daysInMon(y: number[]) {
  for (let i = 0; i <= 11; i++) {
    if (i == 1) {
      monLen.push(y[0]);
    }
    if (i == 3 || i == 5 || i == 8 || i == 10) {
      monLen.push(y[1]);
    } else {
      monLen.push(y[2]);
    }
  }
}

function getDay(x: number[], y: number) {
  for (let i = 0; i < x.length; i++) {
    const ans = (x[i] % 7) - (y + 1);
    if (ans > 0) {
      firstDay.push(7 - ans);
    } else {
      firstDay.push(-ans);
    }
  }
}

function arr42() {
  // populates monCal with 12 arrays of the 42 days
  for (let i = 0; i < months.length; i++) {
    let k: any = monLen.at(i - 1);
    for (let j = firstDay[i]; j > 0; j--) {
      monCal[i].unshift(k);
      k--;
    }
    for (let j = 1; j <= monLen[i]; j++) {
      monCal[i].push(j);
    }
    k = 1;
    for (let j = monCal[i].length; j < 42; j++) {
      monCal[i].push(k);
      k++;
    }
  }
}

function arrSplit() {
  // the 42 days of monCal into arrays of a week
  for (let i = 0; i < 12; i++) {
    const temp = [];
    let start = 0;
    for (let j = 7; j < 43; j += 7) {
      temp.push(monCal[i].slice(start, j));
      start += 7;
    }
    monCal[i] = temp;
  }
}

export function Month({
  i,
  month,
  year,
}: {
  year: number;
  i: number;
  month: string;
}) {
  if ((monCal = [[], [], [], [], [], [], [], [], [], [], [], []])) {
    monLen = [];
    firstDay = [];
    const dayOfDoom = new Date(`March 14, ${year}`).getDay();
    isLeap(year);
    daysInMon(days);
    getDay(doomsDay, dayOfDoom);
    arr42();
    arrSplit();
  }
  return (
    <table className="table-fixed w-full wrapper">
      <thead>
        <tr>
          {weekDays.map((day) => {
            if (day === "Sunday" || day === "Saturday") {
              return (
                <th className="text-indigo-900 border-y-2 border-black px-2 py-1.5 font-mono font-medium mx-2">
                  <span>{day[0]}</span>
                  <span className="collapse md:visible">{day.slice(1, 3)}</span>
                </th>
              );
            } else {
              return (
                <th className="text-slate-900 border-y-2 border-black px-2 py-1.5 font-mono font-medium mx-2">
                  <span>{day[0]}</span>
                  <span className="collapse md:visible">{day.slice(1, 3)}</span>
                </th>
              );
            }
          })}
        </tr>
      </thead>
      <tbody>
        {monCal[i].map((week: number[], j: number) => (
          <tr className="overflow-hidden leading-6 whitespace-nowrap">
            {week.map((theDay, k) => {
              const p = j * 7 + (k + 1);
              if (theDay > 13 && theDay > p && i === 0) {
                return (
                  <td className="border-t border-black whitespace-nowrap">
                    <TableDate
                      dist="cc"
                      uuid={`${theDay}-${months[11]}-${year - 1}`}
                    />
                    <Link href={`${year - 1}/${months[11]}/${theDay}`}>
			o
                    </Link>
                  </td>
                );
              } else if (theDay > 13 && theDay > p) {
                return (
                  <td className="border-t border-black whitespace-nowrap">
                    <TableDate
                      dist="cc"
                      uuid={`${theDay}-${months[i - 1]}-${year}`}
                    />
                    <Link href={`${year}/${months[i - 1]}/${theDay}`}>
			o
                    </Link>
                  </td>
                );
              } else if (theDay < 14 && p > monLen[i] && i === 11) {
                return (
                  <td className="border-t border-black whitespace-nowrap">
                    <TableDate
                      dist="cc"
                      uuid={`${theDay}-${months[0]}-${year + 1}`}
                    />
                    <Link href={`${year + 1}/${months[0]}/${theDay}`}>
			o
                    </Link>
                  </td>
                );
              } else if (theDay < 14 && p > monLen[i]) {
                return (
                  <td className="border-t border-black whitespace-nowrap">
                    <TableDate
                      dist="cc"
                      uuid={`${theDay}-${months[i + 1]}-${year}`}
                    />
                    <Link href={`${year}/${months[i + 1]}/${theDay}`}>
			o
                    </Link>
                  </td>
                );
              } else {
                return (
                  <td className="border-t border-black whitespace-nowrap">
                    <TableDate dist="gen" uuid={`${theDay}-${month}-${year}`} />
                    <Link href={`${year}/${month}/${theDay}`}>
                      o
                    </Link>
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Grid({
  start,
  end,
  pic,
  col,
  year,
}: {
  year: number;
  pic: string;
  col: string;
  start: number;
  end: number;
}) {
  return (
    <div
      className={`block relative max-md:flex max-md:flex-col md:grid md:grid-cols-2 place-content-evenly bg-fixed gap-y-16 bg-center bg-no-repeat w-screen place-items-center p-8 gap-x-4 ${pic} bg-cover`}
    >
      {months.slice(start, end + 1).map((month, i) => (
        <div
          key={i}
          className={`relative block w-full mx-8 border border-black ${col} h-25 `}
        >
          <Link className="block text-center py-1.5" href={`/${year}/${month}`}>
            {month}
          </Link>
          <Month i={i + start} month={month} year={year} />
        </div>
      ))}
    </div>
  );
}

export default function TriGrid({ year }: { year: number }) {
  const dayOfDoom = new Date(`March 14, ${year}`).getDay();
  monLen = [];
  firstDay = [];
  monCal = [[], [], [], [], [], [], [], [], [], [], [], []];
  isLeap(year);
  daysInMon(days);
  getDay(doomsDay, dayOfDoom);
  arr42();
  arrSplit();
  return (
    <div id="home" className="bg-slate-400 overflow-visible"
      <Grid start={0} end={3} pic="bg-snow" col="bg-[#666666]/60" year={year} />
      <Grid
        start={4}
        end={7}
        pic="bg-summer"
        col="bg-[#666666]/60"
        year={year}
      />
      <Grid
        start={8}
        end={11}
        pic="bg-autumn"
        col="bg-[#666666]/60"
        year={year}
      />
    </div>
  );
}
