import {Month} from "../grid.tsx"

const monthsObj = [
    {0: "January"},
    {1: "Febuary"},
    {2: "March"},
    {3: "April"},
    {4: "May"},
    {5: "June"},
    {6: "July"},
    {7: "August"},
    {8: "September"},
    {9: "October"},
    {10: "November"},
    {11: "December"},
]

const months = [
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

// Generate segments for [category]
export async function generateStaticParams() {
    return monthsObj
}

async function getMonth(params){
    
}

export default function Page({ params }: {
    params: {eachMonth: string}
}) {
    console.log(params)
    return (
	<h1> {params.eachMonth} </h1>
	
    )
}
