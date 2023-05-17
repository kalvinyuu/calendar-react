import TriGrid from "./grid.tsx";
import { EventsProvider } from "./context";

export default function Page() {
    return (
	<EventsProvider>
	    <div>
		<TriGrid />
	    </div>
	</EventsProvider>
    );
}
