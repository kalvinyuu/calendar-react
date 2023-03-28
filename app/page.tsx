//'use client'
import TableDate from './client.tsx'
const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// const week_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const days = [28 || 29, 30, 31];
const date = new Date();
const year = date.getFullYear();
let doomsDay = [3, 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12];
const PIday = new Date(`March 14, ${year}`);
const dayOfDoom = PIday.getDay();
let monLen: number[] = []
let firstDay: number[] = []
let monCal: any = [[], [], [], [], [], [], [], [], [], [], [], [],]
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

function objMaker() {
    months.forEach((e, i) => {
        yearObj[e] = monCal[i]
    })
}
objMaker()

function Grid(props: any) {
    let x = props.x
    let y = props.y
    let pic = props.pic
    let col = props.col
    return (
	<div className={`grid grid-cols-2 place-content-evenly bg-fixed gap-y-16 bg-center bg-no-repeat w-screen h-screen place-items-center static px-4 gap-x-4 ${pic} bg-cover overflow-visible`
	} >
	    {
		months.map((month, i) => {
		    if (i >= x && i <= y) {
			return <div className={`inline-block w-full mx-8 border border-black ${col}`} >
			    <p className="block text-center py-1.5 " > {month} </p>
			    < table className="table-fixed w-full wrapper" >
			    <thead>
				<tr>
				    {
					weekDays.map((day) => {
					    if (day === "Sunday" || day === "Saturday") {
						return <th className="text-indigo-900 border-y-2 border-black px-2 py-1.5 font-mono font-medium" > {day} </th>
					    }
					    else {
						return <th className="text-slate-900 border-y-2 border-black px-2 py-1.5 font-mono font-medium" > {day} </th>
					    }
					})
				    }
				</tr>
			    </thead>
			    <tbody>
				{
				    monCal[i].map((week: number[], j) => (
					<tr>
					    {
						week.map((theDay, k) => {
						    let p = (j * 7) + (k + 1)
						    if (theDay > 13 && theDay > p && i === 0) {
							return (
							    <TableDate dist='cc' uuid={`${theDay}-${months[11]}-${year - 1}`} today={theDay} />
							)
						    }
						    else if (theDay > 13 && theDay > p) {
							return (
							    <TableDate dist='cc' uuid={`${theDay}-${months[i - 1]}-${year}`} today={theDay} />
							)
						    }
						    else if (theDay < 14 && p > monLen[i] && i === 11) {
							return (
							    <TableDate dist='cc' uuid={`${theDay}-${months[0]}-${year + 1}`} today={theDay} />
							)
						    }
						    else if (theDay < 14 && p > monLen[i]) {
							return (
							    <TableDate dist='cc' uuid={`${theDay}-${months[i + 1]}-${year}`} today={theDay} />
							)
						    }
						    else {
							return (
							    <TableDate dist='gen' uuid={`${theDay}-${month}-${year}`} today={theDay} />
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
        <div id= "home" className = 'bg-slate-400 overflow-visible' >
            <h1 className="text-white text-2xl text-center pt-6" > Welcome to { year } </h1>
            <Grid x = {0} y = {3} pic = "bg-snow" col = "bg-[#666666]/60" />
            <Grid x={4 } y = {7} pic = "bg-summer" col = "bg-[#666666]/60" />
            <Grid x={8 } y = {11} pic = "bg-autumn" col = "bg-[#666666]/60" />
        </div>
    )
};

export default Page
