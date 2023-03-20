'use client'
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';


export default function TableDate(props:any) {
    const [showModal, setShowModal] = useState(false);
    const [emoji, setEmoji] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [showEvent, setShowEvent] = useState(false)
    let uuid = props.uuid;
    let today = props.today;
    let dist = props.dist;
    const modalParent = document.getElementById(`${dist}-${uuid}`);
    const mod = document.getElementById("modal");
    const ref = useRef();
    useOnClickOutside(ref, () => setShowModal(false));

    const handleClick = (x, y, z) => {
	setEmoji(document.getElementById("emoji"))
	setName(document.getElementById("name"))
	setDesc(document.getElementById("desc"))
    }

	return (<>
		<td id={`${dist}-${uuid}`} className={`overflow-visible border-t border-black  ${uuid} `}>
			<button onClick={() => setShowModal(true)} className={`px-2 border-black border rounded-full m-2 w-min btn-${uuid}`}>{today}</button>
		</td>
		{showModal && createPortal(
			<div ref={ref}>
				<Modal abc={uuid} onClose={() => setShowModal(false)} submit={handleClick} />
			</div>, modalParent)}
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

function Modal({abc, onClose, submit}) {
    //	const target = event.target.parentNode.className;
    //   const parents = document.querySelectorAll(`.${target}`);
    const emoji = document.getElementById("emoji") as HTMLInputElement;
    const name = document.getElementById("name") as HTMLInputElement;
    const description = document.getElementById("description") as HTMLInputElement;
    return (
	<div className="flex-col absolute bg-slate-500 p-6 rounded-md space-y-2 overflow-visible" >
	    <p className="text-center" > {abc} </p>
	    <form className="flex-col space-y-2" >
		<input className="block" placeholder=" Symbol" id="emoji" ></input>
		<input className="block" placeholder=" Event name" id="name"></input>
		<input className="block" placeholder=" Description" id="description"></input>
		<div className="block space-x-4" >
		    <button className="bg-slate-100 py-1 px-2 rounded-lg" value="cancel" onClick={onClose} > Cancel </button>
		    <button className="bg-slate-100 py-1 px-2 rounded-lg" value="default" onClick={handleClick(emoji, name, desc)}> Confirm </button>
		</div>
	    </form>
	</div >

    )
    //parents.forEach(item => {
	//	item.
	//})
}
function event({ emoji, name, desc }){
    return (
	<a>{emoji}
		<div>
			<h3>{name}</h3>
			<p>{desc}</p>
			<i></i>
		</div>
	</a>
    )
}
