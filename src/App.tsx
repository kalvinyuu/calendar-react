import './App.css';
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { useState } from 'react';

const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// const week_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const days = [28 || 29, 30, 31];
const date = new Date();
const year = date.getFullYear();
let doomsDay = [3, 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12];
const PIday = new Date(`March 14, ${year}`);
const dayOfDoom = PIday.getDay();
let monLen : number[] = []
let firstDay : number[] = []
let monCal : any = [[],[],[],[],[],[],[],[],[],[],[],[],]
let yearObj = {}


function calcLeap(x) {
    if (x % 4 == 0) {
        const leap = true;
        days[0] = 29;
        doomsDay[0] += 1;
        doomsDay[1] += 1;
    }
    else {
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
        }
        else {
            monLen.push(y[2]);
        }
    }
}
daysInMon(months, days);

function getDay(x, y) {
    for (let i = 0; i < x.length; i++) {
	let ans = x[i] % 7 - (y + 1)
	if (ans > 0) {
	    firstDay.push(7 - ans)
	}
	else {
	    firstDay.push(-ans)
	}
    }
}
getDay(doomsDay, dayOfDoom)


function arr42() {
    for (let i = 0; i < months.length; i++) {
	let k = monLen.at(i - 1);
	for (let j = firstDay[i]; j > 0; j--) {
	    monCal[i].unshift(k);
	    k--
	}
	for (let j = 1; j <= monLen[i]; j++) {
	    monCal[i].push(j);
	}
	k = 1
	for (let j = monCal[i].length; j < 42; j++) {
	    monCal[i].push(k);
	    k++
	}
    }
}
arr42()

function arrSplit() {
    for (let i = 0; i < months.length; i++) {
	let temp: number[] = []
	let start = 0
	for (let j = 7; j < 43; j += 7) {
	    temp.push(monCal[i].slice(start, j))
	    start += 7
	}
	monCal[i] = temp
    }
}
arrSplit()

// function objMaker(x, y, z) {
//  y.forEach((e, i) => {
//	 x[e] = z[i];
//   });
//} 

//objMaker(yearObj, month, monCal)


function objMaker() {
    months.forEach((e, i) => {
	yearObj[e] = monCal[i]
    })
}
objMaker()

function Grid(props: any) {
    let x = props.x
    let y = props.y
    return (
	<div className='grid grid-cols-2 place-content-evenly bg-fixed gap-y-16 bg-center bg-no-repeat w-screen h-screen overscroll-contain place-items-center sticky px-4 gap-x-4'>
	    {months.map((month, i) => {
		if (i >= x && i <= y) {
		    return <div className=" inline-block w-full mx-8 border border-black">
			<p className="block text-center py-1.5 ">{month}</p>
			<table className="table-fixed w-full">
			    <thead>
				<tr>
				    {weekDays.map((day) => {
					if (day === "Sunday" || day === "Saturday") {
					    return <th className="text-blue-700 border-y-2 border-black px-2 py-1.5 font-mono font-medium" >{day}</th>
					}
					else {
					    return <th className="text-slate-700 border-y-2 border-black px-2 py-1.5 font-mono font-medium">{day}</th>
					}
				    })}
				</tr>
			    </thead>
			    <tbody>
				{monCal[i].map((week: number[], j) => (
				    <tr>
					{week.map((theDay, k) => {
					    let p = (j * 7) + (k + 1)
					    if(theDay > 13 && theDay > p && i === 0) { 
						return (
						    <td className={`border-t border-black  ${theDay}-${months[11]}-${year - 1} `}>
							<button className="px-2 border-black border rounded-full m-2 w-min">{theDay}</button>
						    </td>
						)
					    }
					    else if(theDay > 13 && theDay > p) { 
						return (
						    <td className={`border-t border-black ${theDay}-${months[i-1]}-${year}`}>
							<button className="px-2 border-black border rounded-full m-2 w-min">{theDay}</button>
						    </td>
						)
					    }
					    else if(theDay < 14 && p > monLen[i] && i === 11) {
						return (
						    <td className={`border-t border-black ${theDay}-${months[0]}-${year + 1}`}>
							<button className="px-2 border-black border rounded-full m-2 w-min">{theDay}</button>
						    </td>
						)
					    }
					    else if(theDay < 14 && p > monLen[i]) {
						return (
						    <td className={`border-t border-black ${theDay}-${months[i+1]}-${year}`}>
							<button className="px-2 border-black border rounded-full m-2 w-min">{theDay}</button>
						    </td>
						)
					    }
					    else { 
						return (
						    <td className={`border-t border-black ${theDay}-${month}-${year}`}>
							<button className="px-2 border-black border rounded-full m-2 w-min">{theDay}</button>
						    </td>
						)
					    }
					})}
				    </tr>
				))}
			    </tbody>
			</table>
		    </div>
		}
	    })}
	</div>
    )
};

function Page() {
	return (
	    <body className='bg-slate-400 overflow-x-clip"'>
		<h1 className="text-white text-2xl text-center pt-6">Welcome to {year}</h1>
		<Grid x={0} y={3} />
		<Grid x={4} y={7} />
	    <Grid x={8} y={11} />
	</body>
    )
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);

export default Page
