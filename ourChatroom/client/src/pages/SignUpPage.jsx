import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {

	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	////////////////////////////////////////////
	// async function handleSubmit() {
	
	// // make the fetch to the backend to authenticate the credentials
	// try {
	// 	const response = await fetch('/api', {
	// 		method: 'POST',
	// 		headers: {
	// 		'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({ name, password })
	// 	});
	
	// 	if (response.ok) {
	// 		console.log('Authentication successful!');
	// 		// Send the username and password to the server for authentication
	// 		navigate(`/chat/${name}`);
		  	
	// 	} else {
	// 		alert('Invalid username or password');
	// 		navigate(`/`);
	// 	}
	// 	} catch (error) {
	// 	console.error(error);
	// 	}
	// }
	/////////////////////////////////////////////////

	// start chatting!
	const navigateToChatPage = () => {
		if (name !== '' && password !== '') navigate(`/chat/${name}`);
	}
	// navigate to login
	const navigateToLoginPage = () => {
		navigate(`/login`);
	}


	return (
		<main className='simple-wrapper'>
			<p className='simple-header'>Welcome to Our Chat room</p>
			<p id='name-label' className='simple-subhead'>
				What's your username?
			</p>
			<form onSumbit ={handleSubmit}>
			<div className='simple-section'>
				<input 
					aria-labelledby='name-label'
					type='text'
					autoComplete='name'
					placeholder='username'
					// placeholder="What's a good nickname?..." 

					value = {name}
					onChange={(e) => setName(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') navigateToChatPage();
					}}
				/>
			</div>
			<div className='simple-section'>
				<input 
					aria-labelledby='name-label'
					type='text'
					autoComplete='name'
					placeholder="password" 
					value = {password}
					
					onChange={(e) => {setPassword(e.target.value);}}
					onKeyDown={(e) => {
						if (e.key === 'Enter') navigateToChatPage();
					}}
				/>
			</div>
			<div id='begin-chat-btn' className='simple-section'>
				<button onClick={navigateToChatPage}>Begin chat</button>
			</div>
			</form>
			<div id='begin-chat-btn' className='simple-section'>
				<button onClick={navigateToLoginPage}>Login</button>
			</div>
		</main>
	);
};