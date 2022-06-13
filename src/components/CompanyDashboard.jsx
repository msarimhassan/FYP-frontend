import React, { useContext, useEffect } from 'react';
import Tiles from './CompanyDashboard/Tiles';
import '.././styles/Dashboard.css';
import { Switch, Route,Redirect } from 'react-router-dom';
import AddTour from './CompanyDashboard/AddTour';
import UpdateTour from './CompanyDashboard/UpdateTour';
import ManageTours from './CompanyDashboard/ManageTours';
import ResponsiveAppBar from './CompanyDashboard/AppBar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CompanyContext } from '../contexts/CompanyContext';
import CompanyProfile from './CompanyDashboard/CompanyProfile';
import { useAuth } from '../contexts/AuthContext';

export default function Company(props) {
	const { match } = props;
	const { companyData } = useContext(CompanyContext);
	const {currentUser}=useAuth();
	const isOrg=localStorage.getItem('isOrg');
 if(isOrg==='Yes'){
	return (
		<div style={{ backgroundColor: '#F3F3F3' }}>
			<ResponsiveAppBar pathname={match.path} />
			<Box sx={{ my: 3, mx: 2 }}>
				<Typography gutterBottom variant="h4" component="div">
					Hello,{' '}
					{companyData
						? companyData.name
						: localStorage.getItem('CompanyName')}{' '}
					<span className="wave">👋</span>
				</Typography>
				<Divider variant="middle" />
			</Box>

			<Switch>
				<Route
					exact
					path={`${match.path}/dashboard`}
					component={Tiles}
				/>
				<Route
					exact
					path={`${match.path}/addtour`}
					component={AddTour}
				/>
				<Route
					exact
					path={`${match.path}/managetours`}
					component={ManageTours}
				/>
				<Route
					exact
					path={`${match.path}/updatetour`}
					component={UpdateTour}
				/>
				<Route
					exact
					path={`${match.path}/companyprofile`}
					component={CompanyProfile}
				/>
			</Switch>

			<br />
		</div>
	);
					}
					else{
						return <Redirect to='/'/>
					}
}
