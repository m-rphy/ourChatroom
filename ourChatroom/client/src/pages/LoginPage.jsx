import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

	const navigate = useNavigate();
	const [name, setName] = useState('');
	////////////////////////////////////////////
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [password, setPassword] = useState('');

	////////////////////////////////////////////
		async function handleSubmit(e) {
			e.preventDefault();
			console.log('Submitting form...');
			// make the fetch to the backend to authenticate the credentials
			try {
				const res = await fetch('/api', {
					method: 'POST',
					headers: {
					'Content-Type': 'application/json'
					},
					body: JSON.stringify({ name, password })
				});
			
				if (res.status === 200) {
					console.log('Authentication successful!');
					// Send the username and password to the server for authentication
					navigate(`/chat/${name}`);
					  
				} else {
					alert(`Invalid username or password ${res.status}`);
					navigate(`/`);
				}
				} catch (error) {
				console.error(error);
				}
			}
	/////////////////////////////////////////////////
	const navigateToChatPage = () => {
		if (name !== '' && password !== '') navigate(`/chat/${name}`);
	}

	return (
		<div className='AuthPageBody'>
		<main className='simple-wrapper'>
			<p className='simple-header'>Welcome to Our Chat room</p>
			<p id='name-label' className='simple-subhead'>
				Welcome Back!{/* What's your username? */}
			</p>
			<form onSubmit= {handleSubmit}>
			<div className='simple-section'>
				<input 
					aria-labelledby='name-label'
					type='text'
					autoComplete='name'
					placeholder='username'
					// placeholder="What's a good nickname?..." 

					value = {name}
					onChange={(e) => setName(e.target.value)}
					// onKeyDown={(e) => {
					// 	if (e.key === 'Enter') navigateToChatPage();
					// }}
				/>
			</div>
			{/* /////////////////////////////////////////////////////// */}
			<div className='simple-section'>
				<input 
					aria-labelledby='password-label'
					type='text'
					autoComplete='name'
					placeholder="password" 

					value = {password}
					onChange={(e) => setPassword(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') handleSubmit(e);
					}}
				/>
			</div>
			{/* /////////////////////////////////////////////////////// */}
			<div id='begin-chat-btn' className='simple-section'>
				<button type='submit'>Submit</button>
				{/* <button onClick={navigateToChatPage}>Begin chat</button> */}
			</div>
			</form>
		</main>
		</div>
	);
};
