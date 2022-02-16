import React from 'react';
import { Route, Redirect } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
	const { currentUser } = useAuth();
	currentUser = true;
	return (
		<Route
			{...rest}
			render={props => {
				return currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to="/" />
				);
			}}
		></Route>
	);
}
