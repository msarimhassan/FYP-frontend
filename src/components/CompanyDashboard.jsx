import React, { useEffect } from 'react';
import Sidebar from './CompanyDashboard/Sidebar';
import Tiles from './CompanyDashboard/Tiles';
import '.././styles/Dashboard.css';
import arrows from '../images/arrows.png';
import { Switch, Route } from 'react-router-dom';
import AddTour from './CompanyDashboard/AddTour';
import UpdateTour from './CompanyDashboard/UpdateTour';
import ManageTours from './CompanyDashboard/ManageTours';
import ResponsiveAppBar from './CompanyDashboard/AppBar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuth } from '.././contexts/AuthContext';
import axios from 'axios';

export default function Company(props) {
	const { match, location, history } = props;
	const { currentUser } = useAuth();
	return (
		<div style={{ backgroundColor: '#F3F3F3' }}>
			<ResponsiveAppBar pathname={match.path} />
			{/* <Sidebar/>
           <div className='content'>
             <Switch>
               <Route exact path="/company">
               <Tiles heading="Total Tours" info="0" img={arrows}/>
           </Route>
           <Route exact path="/addtour" component={AddTour}/>
             </Switch>
           </div> */}
			<Box sx={{ my: 3, mx: 2 }}>
				<Typography gutterBottom variant="h4" component="div">
					Hey, {currentUser && currentUser.email}{' '}
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
			</Switch>

			<br />
		</div>
	);
}
