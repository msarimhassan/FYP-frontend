import React, { useContext } from 'react';
import Appbar from './UserDashboard/Appbar';
import Favourite from './UserDashboard/Favourite.jsx';
import Dashboard from './UserDashboard/Dashboard';
import { Switch, Route,Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { Divider, Typography, Box } from '@mui/material';
import UserProfile from "./UserDashboard/UserProfile";
import Feedback from './UserDashboard/Feedback';
import { useAuth } from '../contexts/AuthContext';

export default function User(props) {
	const { match } = props;
	const {currentUser}=useAuth();
	const { userData } = useContext(UserContext);
	const isOrg=localStorage.getItem('isOrg');
	if(isOrg==='No'){
	return (
		<>
			<Appbar pathname={match.path} />
			<Box sx={{ my: 3, mx: 2 }}>
				<Typography gutterBottom variant="h4" component="div">
					Hello,{' '}
					{userData ? userData.name : localStorage.getItem('Name')}{' '}
				</Typography>
				<Divider variant="middle" />
			</Box>
			<Switch>
				<Route
					exact
					path={`${match.path}/dashboard`}
					component={Dashboard}
				/>
				<Route
					exact
					path={`${match.path}/favourite`}
					component={Favourite}
				/>
				<Route
					exact
					path={`${match.path}/userprofile`}
					component={UserProfile}
				/>
				<Route
					exact
					path={`${match.path}/feedback`}
					component={Feedback}
				/>
			</Switch>
		</>
	);
	}
	else{
		return <Redirect to='/'/>
	}
}
