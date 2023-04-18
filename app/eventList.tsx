'use client'
import {useEvents, useEventsDispatch} from './context.tsx'
import {useState} from 'react'
import { createPortal } from 'react-dom';

export default function EventComp({state, destination}) {
    const events = useEvents();
    console.log(events)
    return (
	state && createPortal (
		<span>
			{events.map(event => event.destination === destination.id || event.altDestination === destination.id ? (
				<Event key={event.id}
					emoji={event.emoji}
					name={event.name}
					desc={event.desc}
					event={event} />) : null)}
		</span>, destination
	))
}

function Event({ event, emoji, name, desc }) {
	const [isEditing, setEditing] = useState(false);
    const dispatch = useEventsDispatch();
	//localStorageUploader()
	let EventContent;
	if (isEditing) { //edit
		EventContent = (
			<>
				<input value={emoji} onChange={e => {
					dispatch({
						type: 'changed',
						event: {
							...event,
							emoji: e.target.value
						}
					})
				}} />
				<div>
					<input value={name} onChange={e => {
						dispatch({
							type: 'changed',
							event: {
								...event,
								name: e.target.value
							}
						})
					}} />
					<input value={desc} onChange={e => {
						dispatch({
							type: 'changed',
							event: {
								...event,
								desc: e.target.value
							}
						})
					}} />
					<button onClick={() => setEditing(false)}>save</button>
					<button onClick={() => {
						dispatch({
							type: 'deleted',
							id: event.id
						});
					}}>remove</button>
				</div>
			</>
		)
	}
	else {
	EventContent = (
	    <a>{emoji}
		<div>
		    <h3>{name}</h3>
		    <p>{desc}</p>
		    <button onClick={ () => setEditing(true) }>edit</button>
		    <button onClick={() => {
			dispatch({
			    type: 'deleted',
			    id: event.id
			});
		    }}>remove</button>
		</div>
	    </a>
    )}


    return (
	<>
	    {EventContent}
	</>
    )
}
