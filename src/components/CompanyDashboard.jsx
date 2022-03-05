import React, { useEffect, useContext } from 'react';
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
import { CompanyContext } from '../contexts/CompanyContext';
import CompanyProfile from './CompanyDashboard/CompanyProfile';

export default function Company(props) {
	const { match, location, history } = props;
	const { currentUser } = useAuth();
	const { setCount, setCompanyData, companyData } =
		useContext(CompanyContext);

	useEffect(() => {
		const fetchdata = async () => {
			try {
				console.log('Hello')
				const requestTwo = await axios.get(`http://localhost:5000/company/getcompanydata/${currentUser.email}`);
				setCompanyData(requestTwo.data);
				console.log('Saad', requestTwo);
			} catch (err) {
				console.log(err)
			}
		// let two = `http://localhost:5000/company/getcompanydata/${currentUser.email}`;
		// const requestTwo = await axios.get(two);
		// console.log('Saad', requestTwo)
		// axios
		// 	.all([requestTwo])
		// 	.then(
		// 		axios.spread((...responses) => {
		// 			const responseTwo = responses[0];
		// 			setCompanyData(responseTwo.data);
		// 		})
		// 	)
		// 	.catch(errors => {
		// 		console.log(errors);
		// 	});

		console.log('Hello 2')
		
	};

	 fetchdata();
	}, []);
	
	return (
		<div style={{ backgroundColor: '#F3F3F3' }}>
			<ResponsiveAppBar pathname={match.path} />
			<Box sx={{ my: 3, mx: 2 }}>
				<Typography gutterBottom variant="h4" component="div">
					Hello, {companyData && companyData.name}{' '}
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
