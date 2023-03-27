'use client'
import { useState, useEffect, useRef, useReducer, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

const EventContext = createContext(null)
const EventDispatchContext = createContext(null)
let nextId = 0

//let emoji = document.getElementById("emoji") as HTMLInputElement;
//let name = document.getElementById("name") as HTMLInputElement;
//let description = document.getElementById("description") as HTMLInputElement;

export default function TableDate(props: any) {//App.js add initialEvents as local storage
	const [createEvents, showEvents] = useState(false)
    const [showModal, setShowModal] = useState(false);
    let uuid = props.uuid;
    let today = props.today;
    let dist = props.dist;
    const modalParent = document.getElementById(`${dist}-${uuid}`);
    const mod = document.getElementById("modal");
    const ref = useRef();
    useOnClickOutside(ref, () => setShowModal(false));
	
    
    return (<>
	<EventsProvider>
	<td id={`${dist}-${uuid}`} className={`overflow-visible border-t border-black  ${uuid} `}>
	    <button onClick={() => setShowModal(true)} className={`px-2 border-black border rounded-full m-2 w-min btn-${uuid}`}>{today}</button>
	    {createEvents && createPortal (
		<>
			<EventComp/>			
		</>
		, modalParent
	    )}
	</td>
	{showModal && createPortal(
	    <div ref={ref}>
		<Modal abc={uuid} onClose={() => setShowModal(false)} showList={() => showEvents(true)} />
	    </div>, modalParent
	)}
	</EventsProvider>
    </>);
}

//imported function from stackOverflow
function useOnClickOutside(ref, handler) {
    useEffect (
	() => {
			const listener = (event) => {
				// Do nothing if clicking ref's element or descendent elements
				if (!ref.current || ref.current.contains(event.target)) {
					return;
				}
				handler(event);
			};
			document.addEventListener("mousedown", listener);
			document.addEventListener("touchstart", listener);
			return () => {
				document.removeEventListener("mousedown", listener);
				document.removeEventListener("touchstart", listener);
			};
		},
		// Add ref and handler to effect dependencies
		// It's worth noting that because the passed-in handler is a new ...
		// ... function on every render that will cause this effect ...
		// ... callback/cleanup to run every render. It's not a big deal ...
		// ... but to optimize you can wrap handler in useCallback before ...
		// ... passing it into this hook.
		[ref, handler]
	);
}

function Modal({abc, onClose, showList}) { //AddList.js
    const [emoji, setEmoji] = useState('')
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
	const dispatch = useEventsDispatch()
    //	const target = event.target.parentNode.className;
    //   const parents = document.querySelectorAll(`.${target}`);
    function submit() {
	setDesc('');
	setEmoji('');
	setName('');
	dispatch({
		type: 'added',
		id: nextId++,
		emoji: emoji,
		name: name,
		desc: desc,
	    })
}	
    return (
	<div className="flex-col absolute bg-slate-500 p-6 rounded-md space-y-2 overflow-visible">
	    <p className="text-center" > {abc} </p>
	    <div className="flex-col space-y-2">
		<input className="block" placeholder=" Symbol" id="emoji" value={emoji}
		       onChange={e => setEmoji(e.target.value)}></input>
		<input className="block" placeholder=" Event name" id="name" value={name} onChange={e => setName(e.target.value)}></input>
		<input className="block" placeholder=" Description" id="description" value={desc} onChange={e => setDesc(e.target.value)}></input>
		<div className="block space-x-4" >
		    <button className="bg-slate-100 py-1 px-2 rounded-lg" value="cancel" onClick={onClose} > Cancel </button>
		    <button className="bg-slate-100 py-1 px-2 rounded-lg" value="default" onClick={() => {showList(); submit();}}> Confirm </button>
			</div>
			</div>
			</div>
	
    )
}

function EventsProvider({children}) {
	const [events, dispatch] = useReducer (
		eventReducer,
		initialEvents
		);
		//const emoji = events.emoji
		//const name = events.name
		//const desc = events.name
		return (
			<EventContext.Provider value={events}>
				<EventDispatchContext.Provider value={dispatch}>
					{children}
				</EventDispatchContext.Provider>
			</EventContext.Provider>
		)
	}
function useEvents() {
	return useContext(EventContext)
}
function useEventsDispatch() {
	return useContext(EventDispatchContext)
}

function eventReducer(events, action) {
    switch (action.type) {
	case 'added': {
	    return [...events, {
		id: action.id,
		emoji: action.emoji,
		name: action.name,
		desc: action.desc,
	    }];
	}
	    
	case 'changed': {
	    return events.map(ev => {
		if (ev.id === action.event.id) {
		    return action.event;
		} else {
		    return ev;
		}
	    });
	}
	case 'deleted': {
	    return events.filter(ev => ev.id !== action.id);
	}
	default: {
	    throw Error('Unknown action: ' + action.type);
	}
    }
}

function EventComp() {
	const events = useEvents();
    return (
	<span>
	{ events.map(event => (
	    <Event key={event.id}
	    emoji={event.emoji} 
		name={event.name}
		desc={event.desc}
		event={event}/>
	))}
    </span>
)}

function Event({event, emoji, name, desc }) {
    const [isEditing, setEditing] = useState(false)
	const dispatch = useEventsDispatch();
    let EventContent;
    if (isEditing) {
		EventContent = (
			<>
	<input value={emoji} onChange={e => {
		dispatch ({
			type: 'changed',
			event: {
				...event, 
				emoji: e.target.value
			}
		})
	}}/>
	    <div>
		<input value={name} onChange={e => {
		dispatch ({
			type: 'changed',
			event: {
				...event, 
				name: e.target.value
			}
		})
	}}/>
		<input value={desc} onChange={e => {
		dispatch ({
			type: 'changed',
			event: {
				...event, 
				desc: e.target.value
			}
		})
	}}/>
		<button onClick={() => setEditing(false)}>save</button>
		<button onClick={() => {
        dispatch({
          type: 'deleted',
          id: event.id
        });
      }}>remove</button>
	    </div>
		</>
    )}
	else {
		EventContent = (
			<a>{emoji}
				<div>
				<h3>{name}</h3>
				<p>{desc}</p>
				<button onClick={() => setEditing(true)}>edit</button>
				<button onClick={() => {
        dispatch({
          type: 'deleted',
          id: event.id
        });
      }}>remove</button>
				</div>
			</a>
			)}


return(
	<>
		{EventContent}
	</>
)
}
const initialEvents = [];
