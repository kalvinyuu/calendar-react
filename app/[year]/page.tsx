import TriGrid  from "../grid"

export default function Page({params}) {
    return(
	<TriGrid year={params.year} />
    )
}
