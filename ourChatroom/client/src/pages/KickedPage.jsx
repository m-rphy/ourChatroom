import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const KickedPage = () => {
	const navigate = useNavigate();
	const { state } = useLocation();

	return (
		<main className='simple-wrapper'>
		</main>
	);
};
