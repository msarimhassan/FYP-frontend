import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ children }) {
	const [isOrg, setIsOrg] = useState(false);
	const { currentUser } = useAuth();

	useEffect(() => {
		if (window.localStorage) {
			const a = localStorage.getItem('isOrg');
			if (a === 'Yes') {
				setIsOrg(true);
			}
		}
	});

	return <>{currentUser && !isOrg ? children : <Redirect to="/" />}</>;
}
