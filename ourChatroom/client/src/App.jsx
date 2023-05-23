
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage, ChatPage, KickedPage, SignUpPage } from './pages';
import './index.scss'

export const App = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SignUpPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/chat/:name' element={<ChatPage />} />
				<Route path='/kicked' element={<KickedPage />} />
			</Routes>
		</BrowserRouter>
	);
};
 