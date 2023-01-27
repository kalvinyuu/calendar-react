import './App.css';
import * as React from "react";
import * as ReactDOM from "react-dom/client";


const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// const week_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const week_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 const days = [28 || 29, 30, 31];
 const date = new Date();
 const year = date.getFullYear();
 let doomsDay = [3, 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12];
 const PIday = new Date(`March 14, ${year}`);
 const dayOfDoom = PIday.getDay();
 let monLen: number[] = []
 let firstDay: number[] = []
 let monCal:any = [[],[],[],[],[],[],[],[],[],[],[],[],]
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
	 let ans = x[i] % 7 - (y+1)
	 if(ans > 0) {
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
	 let k = monLen.at(i - 1 );
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
	 for(let j = 7; j < 43; j += 7) {
	     temp.push(monCal[i].slice(start, j))
	     start +=7
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

class Grid extends React.Component {
    return (
		{ months.map((month, i) => (
			<div className=" inline-block w-full mx-8 border border-black">
			    <p className="block text-center py-1.5 ">{month}</p>
			    <table>
				<tr>
				     week_days.map(day => (
					if(day == "Sunday" || day == "Saturday") {
							<th class="text-slate-700 border-y-2 border-black px-2 py-1.5 font-mono font-medium">{day}</th>
				    }))
				</tr>
			    </table>
			</div>
		))}
)};

		function Page() {
	return (
		<div className=' bg-gray-700 '>
			<h1 className="text-white text-2xl text-center pt-6">Welcome to {year}</h1>
			<div className='grid grid-cols-2 place-content-evenly bg-fixed gap-y-16 bg-center
		bg-no-repeat w-screen h-screen overscroll-contain place-items-center sticky px-4 gap-x-4'>
			    <Grid/>
			</div>
		</div>
	)
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);

export default Page
