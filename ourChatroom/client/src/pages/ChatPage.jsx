import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const sendIcon = (
	<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path d='M19 10L1 1L5 10L1 19L19 10Z' stroke='black' strokeWidth='2' strokeLinejoin='round' />
	</svg>
);

export const ChatPage = () => {
	// refrence to websocket
	const ws = useRef();
	// used to navigate to various pages
	const navigate = useNavigate();
	// get username from params
	const { name } = useParams();

	// Hooks to set messages, messageBody and connection bool
	const [messages, setMessages] = useState([]);
	const [messageBody, setMessageBody] = useState('');
	const [isConnectionOpen, setConnectionOpen] = useState(false);

	// constantly look up the websocket 
	useEffect(() => {
		// new socket connection
		ws.current = new WebSocket('ws://localhost:8081');
		console.log(ws.current)

		ws.current.onopen = () => {
			setConnectionOpen(true);
			// Update the chatters a new User has joined
			const msgText = `${name} has joined!`
			setMessageBody(msgText)
			const newMsg = { sender: name, body: msgText }
			ws.current.send(JSON.stringify(newMsg));
			setMessageBody('')
		};
	
		ws.current.onmessage = (e) => {
			const message = JSON.parse(e.data);
			console.log(e.data)
			setMessages((_messages) => [..._messages, message]);
		};

		ws.current.onclose = (e) => {
			if (e.code === 4000) {
				navigate('/kicked', { state: { kickReason: ev.reason } });
			}
		};

		return () => {
			console.log('Cleaning up! 🧼');
			ws.current.close();
		};
	}, []);

	// used on a handler for the send button
	const send = () => {
		if (messageBody === '') return;
		ws.current.send(JSON.stringify({ sender: name, body: messageBody }));
		setMessageBody('');
	};

	const scrollTarget = useRef(null);
	useEffect(() => {
		if (scrollTarget.current) {
			scrollTarget.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages.length]);

	return (
		<div className='ChatPageBody'>
		<main className='chat-wrapper'>
			<header className='chat-header'>
				<h1>our chat room</h1>
			</header>

			<div className='chat-view-container'>
				{messages.map((message) => (
					<article
						key={message.sentAt}
						className={'message-container' + (message.sender === name ? ' own-message' : '')}>
						<header className='message-header'>
							<h4 className='message-sender'>{message.sender === name ? 'You' : message.sender}</h4>
							<span className='message-time'>
								{new Date(message.sentAt).toLocaleTimeString(undefined, { timeStyle: 'short' })}
							</span>
						</header>
						<p className='message-body'>{message.body}</p>
					</article>
				))}
				<div ref={scrollTarget} />
			</div>

			<footer className='message-input-container'>
				<p className='chatting-as'>You are chatting as “{name}”</p>

				<div className='message-input-container-inner'>
					<input
						autoFocus
						aria-label='Type a message'
						placeholder='Type Here...'
						type='text'

						value={messageBody}
						onChange={(e) => setMessageBody(e.target.value)}

						onKeyDown={(e) => {
							if (e.key === 'Enter') send();
						}}
					/>

					<button
						aria-label='Send'
						className='icon-button'
						onClick={send}
						disabled={!isConnectionOpen}>
						{sendIcon}
					</button>
				</div>
			</footer>
		</main>
		</div>
	);
};
