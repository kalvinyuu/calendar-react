import {months, Month } from "../../grid"
import { EventsProvider } from "../../context";
const monthsObj = [
    { id: "January" },
    { id: "Febuary" },
    { id: "March" },
    { id: "April" },
    { id: "May" },
    { id: "June" },
    { id: "July" },
    { id: "August" },
    { id: "September" },
    { id: "October" },
    { id: "November" },
    { id: "December" },
]

export default function Page({ params }) {
    let fragment
    if(months.find(el => el === params.eachMonth) === undefined) {  
	fragment = (
	    <h1> 404 Error</h1>
	)
    }
    else fragment = (<Month i={months.findIndex(el => el === params.eachMonth)} month={params.eachMonth} year={params.year} />)
    return (
		    <EventsProvider>
			{fragment}
		    </EventsProvider>
	)
}
