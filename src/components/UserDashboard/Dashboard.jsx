import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { UserContext } from '../../contexts/UserContext';
import TourContainer from '../TourContainer';
import MyLoader from '../MyLoader';
import { TextField, InputAdornment } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function Dashboard() {
	const [tours, setTours] = useState([]);
	const [searchedTours, setSearchedTours] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const { userData, setUserData } = useContext(UserContext);

	let email = localStorage.getItem('email');
	useEffect(() => {
		console.log(email);
		console.log('Hi im useffect');
		const fetchData = async () => {
			try {
				Promise.all([
					axios.get(
						`http://localhost:5000/users/getuserdata/${email}`
					),
					axios.get('http://localhost:5000/users/getalltours')
				])
					.then(res => {
						setUserData(res[0].data);
						localStorage.setItem('Name', res[0].data.name);
						console.log(res[1].data);
						setLoading(false);
						setTours([...tours, ...res[1].data]);
					})
					.catch(err => {
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const filterTours = e => {
		const { name, value } = e.target;
		if (name === 'location') {
			const array = tours.filter(item => {
				if (item.location.toLowerCase().includes(value.toLowerCase())) {
					return item;
				}
			});

			console.log({ array });
			setSearchedTours(array);
		} else if (name === 'days') {
			const array = tours.filter(item => {
				if (item.duration.includes(value)) {
					return item;
					
				}
			});
			setSearchedTours(array);
		}
		else if(name==='price'){
			const array = tours.filter(item => {
				if (item.price.includes(value)) {
					return item;
				}
			});
			setSearchedTours(array);
		
		}
	};
	// Dummy function to handle data
	const handleDelete = id => {};

	const ListMap = ({ data }) => {
		return data.map(tour => {
			return (
				<TourContainer
					operation="AddToFavourite"
					flag={false}
					tour={tour}
					key={tour.id}
					handleDelete={handleDelete}
				/>
			);
		});
	};

	return (
		<>
			<div style={{ textAlign: 'center' }}>
				<TextField
					placeholder="Place"
					onChange={e => {
						setSearch(e.target.value);
						filterTours(e);
					}}
					variant="filled"
					name="location"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<PlaceIcon color="secondary" />
							</InputAdornment>
						)
					}}
				/>
				<TextField
					placeholder="Days"
					variant="filled"
					name="days"
					onChange={e => {
						setSearch(e.target.value);
						filterTours(e);
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<DateRangeIcon color="secondary" />
							</InputAdornment>
						)
					}}
				/>
				<TextField
					placeholder="Price"
					variant="filled"
					name="price"
					onChange={e => {
						filterTours(e);
							setSearch(e.target.value);
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AttachMoneyIcon color="secondary" />
							</InputAdornment>
						)
					}}
				/>
			</div>

			{loading ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						height: '100vh'
					}}
				>
					<MyLoader
						style={{
							justifyContent: 'center',
							alignItems: 'center'
						}}
						id={2}
					/>
				</div>
			) : (
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						marginLeft: 'auto',
						marginRight: 'auto',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<ListMap data={search ? searchedTours : tours} />
				</div>
			)}
		</>
	);
}
