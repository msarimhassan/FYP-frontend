import React, { useContext, useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useAuth } from '../../contexts/AuthContext';
import { CompanyContext } from '../../contexts/CompanyContext';
import axios from 'axios';
import ProfileCard from '../ProfileCard';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#df73ff',
	...theme.typography.h4,
	padding: theme.spacing(1),
	textAlign: 'left',
	color: '#fff',
	width: '300px'
}));

export default function Tiles() {
	const { count, companyData, setCompanyData, setCount } =
		useContext(CompanyContext);
	const { currentUser } = useAuth();
	// console.log(companyData);
	// useEffect(() => {
	// 	fetchdata();
	// }, []);
	// const fetchdata = async () => {
	// 	console.log('fetching the data ');
	// 	let one = `http://localhost:5000/company/tourcount/${currentUser.email}`;
	// 	let two = `http://localhost:5000/company/getcompanydata/${currentUser.email}`;
	// 	const requestOne = await axios.get(one);
	// 	const requestTwo = await axios.get(two);
	// 	axios
	// 		.all([requestOne, requestTwo])
	// 		.then(
	// 			axios.spread((...responses) => {
	// 				const responseOne = responses[0];
	// 				const responseTwo = responses[1];
	// 				console.log('responseOne', responseOne);
	// 				console.log('responseTwo', responseTwo);
	// 				setCompanyData(responseTwo.data);
	// 				setCount(responseOne.data.count);
	// 			})
	// 		)
	// 		.catch(errors => {
	// 			console.log(errors);
	// 		});
	// };

	useEffect(() => {
		const fetchData = async () => {
			try {
				const email = localStorage.getItem('email');
				Promise.all([
					axios.get(
						`http://localhost:5000/company/tourcount/${email}`
					),
					axios.get(
						`http://localhost:5000/company/getcompanydata/${email}`
					)
				])
					.then(res => {
						setCount(res[0].data.count);
						setCompanyData(res[1].data);
						localStorage.setItem('CompanyName', res[1].data.name);
						localStorage.setItem(
							'instaUsername',
							res[1].data.instaUsername
						);
						localStorage.setItem(
							'whatsappNo',
							res[1].data.whatsappNo
						);
						localStorage.setItem('url', res[1].data.url);
						// res is an array that contains responses of above two API calls.
						// set your state here
					})
					.catch(err => {
						console.log(err);
					});
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, []);
	useEffect(() => {
		console.log('Abdullah Ch');
	}, []);

	return (
		<React.Fragment>
			<Stack
				direction="row"
				spacing={2}
				justifyContent="flex-end"
				sx={{ mr: 5 }}
			>
				<Link to="/company/addtour" style={{ textDecoration: 'none' }}>
					<Chip
						icon={<AddIcon />}
						color="secondary"
						label="Add Tour"
					/>
				</Link>
				<Link to="/company/addtour" style={{ textDecoration: 'none' }}>
					<Chip
						icon={<EditIcon />}
						color="secondary"
						label="Manage Tours"
					/>
				</Link>
			</Stack>
			<Stack
				width="80%"
				direction={{ xs: 'column', sm: 'row' }}
				divider={<Divider orientation="vertical" flexItem />}
				spacing={2}
				justifyContent="center"
				alignItems="center"
				sx={{
					mt: 5,
					bgcolor: '#df73ff',
					pt: 5,
					pb: 5,
					boxShadow: 3,
					borderRadius: 10,
					ml: 'auto',
					mr: 'auto'
				}}
			>
				<Item elevation={0}>
					<Typography variant="h4">
						<ArrowUpwardIcon />
						Tours Count
					</Typography>
					{count}
					<Typography variant="body2">
						There are {count} tours in your database
					</Typography>
				</Item>
				<Item elevation={0}>
					<Typography variant="h4">
						<FavoriteIcon />
						Liked
					</Typography>
					0
					<Typography variant="body2">
						Total liked by our users
					</Typography>
				</Item>
				<Item elevation={0}>
					<Typography variant="h4">
						<StarRateIcon />
						Ratings
					</Typography>
					0
					<Typography variant="body2">
						Ratings based on experience
					</Typography>
				</Item>
			</Stack>
			{/* profile and graph */}
			<Stack
				width="80%"
				direction={{ xs: 'column', sm: 'row' }}
				justifyContent="center"
				alignItems="center"
				sx={{ mt: 2, ml: 'auto', mr: 'auto' }}
				spacing={8}
			>
				<Item sx={{ bgcolor: ' #D63964', p: 3 }}>
					<ProfileCard />
				</Item>
				<Item>Graph</Item>
			</Stack>
		</React.Fragment>
	);
}
