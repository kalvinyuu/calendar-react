import TableDate from "./client";
import Link from "next/link";
import Image from 'next/image';

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
// const week_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const days = [28 || 29, 30, 31];
const date = new Date();
export let year = date.getFullYear()
let doomsDay = [3, 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12];
const PIday = new Date(`March 14, ${year}`);
const dayOfDoom = PIday.getDay();
export let monLen: number[] = [];
let firstDay: number[] = [];
let monCal: any = [[], [], [], [], [], [], [], [], [], [], [], []];
let yearObj = {};

function calcLeap(x) {
  if (x % 4 == 0) {
    const leap = true;
    days[0] = 29;
    doomsDay[0] += 1;
    doomsDay[1] += 1;
  } else {
    const leap = false;
    days[0] = 28;
  }
}
calcLeap(year);

function daysInMon(x: string[], y: number[]) {
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
daysInMon(months, days);

function getDay(x, y) {
  for (let i = 0; i < x.length; i++) {
    let ans = (x[i] % 7) - (y + 1);
    if (ans > 0) {
      firstDay.push(7 - ans);
    } else {
      firstDay.push(-ans);
    }
  }
}
getDay(doomsDay, dayOfDoom);

function arr42() {
  for (let i = 0; i < months.length; i++) {
    let k = monLen.at(i - 1);
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
arr42();

function arrSplit() {
  for (let i = 0; i < months.length; i++) {
    let temp: number[] = [];
    let start = 0;
    for (let j = 7; j < 43; j += 7) {
      temp.push(monCal[i].slice(start, j));
      start += 7;
    }
    monCal[i] = temp;
  }
}
arrSplit();

function objMaker() {
  months.forEach((e, i) => {
      yearObj[e] = monCal[i];
      
  });
}
objMaker();

export function Month({i, month}) {
    return (
	<table className="table-fixed w-full wrapper">
	    <thead>
		<tr>
		    {weekDays.map((day) => {
			if (day === "Sunday" || day === "Saturday") {
			    return (
				<th className="text-indigo-900 border-y-2 border-black px-2 py-1.5 font-mono font-medium mx-2">
				    <span>{day[0]}</span><span className="collapse md:visible">{day.slice(1,3)}</span>
				</th>
			    );
			} else {
			    return (
				<th className="text-slate-900 border-y-2 border-black px-2 py-1.5 font-mono font-medium mx-2">
				    <span>{day[0]}</span><span className="collapse md:visible">{day.slice(1,3)}</span>
				</th>
			    );
			}
		    })}
		</tr>
	    </thead>
	    <tbody>
		{monCal[i].map((week: number[], j) => (
		    <tr className="overflow-hidden leading-6 whitespace-nowrap">
			{week.map((theDay, k) => {
			    let p = j * 7 + (k + 1);
			    if (theDay > 13 && theDay > p && i === 0) {
				return (
				    <td   
					className="border-t border-black whitespace-nowrap">
					<TableDate
					dist="cc"
					uuid={`${theDay}-${months[11]}-${year - 1}`}
					/>
					<Link href={`/${month[11]}/${theDay}`}><Image alt="link" src="/../public/images/linkIcon.svg" width={12} height={12}/></Link>
				    </td>
				);
			    } else if (theDay > 13 && theDay > p) {
				return (
				    <td  
					className="border-t border-black whitespace-nowrap">
					<TableDate
					    dist="cc"
					    uuid={`${theDay}-${months[i - 1]}-${year}`}
					/>
					<Link href={`/${month[i - 1]}/${theDay}`}><Image alt="link" src="/../public/images/linkIcon.svg" width={12} height={12}/></Link>
				    </td>
				);
			    } else if (theDay < 14 && p > monLen[i] && i === 11) {
				return (
				    <td  
					className="border-t border-black whitespace-nowrap">
					<TableDate
					    dist="cc"
					    uuid={`${theDay}-${months[0]}-${year + 1}`}
					/>
					<Link href={`/${month[0]}/${theDay}`}><Image alt="link" src="/../public/images/linkIcon.svg" width={12} height={12}/></Link>
				    </td>
				);
			    } else if (theDay < 14 && p > monLen[i]) {
				return (
				    <td  
					className="border-t border-black whitespace-nowrap">
					<TableDate
					    dist="cc"
					    uuid={`${theDay}-${months[i + 1]}-${year}`}
					/>	
					<Link href={`/${month[i + 1]}/${theDay}`}><Image alt="link" src="/../public/images/linkIcon.svg" width={12} height={12}/></Link>
				    </td>
				);
			    } else {
				return (
				    <td  
					className="border-t border-black whitespace-nowrap">					
					<TableDate
					    dist="gen"
					    uuid={`${theDay}-${month}-${year}`}
					/>
					<Link href={`/${month}/${theDay}`}><Image alt="link" src="/../public/images/linkIcon.svg" width={12} height={12}/></Link>
				    </td>
				);
			    }
			})}
		    </tr>
		))}
	    </tbody>
	</table>
    )
}


function Grid({x, y, pic, col}) {
  return (
      <div
	  className={`block relative max-md:flex max-md:flex-col md:grid md:grid-cols-2 place-content-evenly bg-fixed gap-y-16 bg-center bg-no-repeat w-screen place-items-center p-8 gap-x-4 ${pic} bg-cover`}
      >
	  {months.slice(x, y + 1).map((month, i) => (
              <div
		  key={i}
		  className={`relative block w-full mx-8 border border-black ${col} h-25 `}
              >
		  <Link className="block text-center py-1.5" href={`/${month}`}>
		      {month}
		  </Link>
		  <Month i={i + x} month={month} />
              </div>
	  ))}
      </div>
  );
}
export default function TriGrid() {
  return (
      <div id="home" className="bg-slate-400 overflow-visible">
        <h1 className="text-white text-2xl text-center pt-6">
            Welcome to {year}
        </h1>
        <Grid x={0} y={3} pic="bg-snow" col="bg-[#666666]/60" />
        <Grid x={4} y={7} pic="bg-summer" col="bg-[#666666]/60" />
        <Grid x={8} y={11} pic="bg-autumn" col="bg-[#666666]/60" />
      </div>
  );
}

