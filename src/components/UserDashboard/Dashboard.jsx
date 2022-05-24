import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { UserContext } from '../../contexts/UserContext';
import TourContainer from '../TourContainer';
import MyLoader from '../MyLoader';
import SearchBox from './SearchBox';
export default function Dashboard() {
	const { currentUser } = useAuth();
	const [tours, setTours] = useState([]);
	const [loading, setLoading] = useState(true);
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
	// const filterTours = value => {
	// 	console.log('filter tours', value);
	// 	const newarray = tours.filter(tour => {
	// 		return (
	// 			tour.location === value.location ||
	// 			tour.duration === value.days ||
	// 			tour.price === value.price
	// 		);
	// 	});
	// 	console.log('sort', newarray);
	// 	setTours(newarray);
	// };

	const filterTours = e => {
        //  const { name, value } = e.target;
		//  switch (name) {
		// 		case 'location':
		// 			 const newarray = tours.map(item => {
		// 					return item.location.includes(value);
		// 				});
		// 				setTours(newarray);
		// 			break;
		// 		case 'price':
		// 			console.log('hello from price');
		// 			break;
		// 		case 'days':
		// 			console.log('hello from days');
		// 			break;
		// 	}
		
	
	}
	// Dummy function to handle data 
	const handleDelete = (id) => {

	}
	return (
		<>
			<SearchBox filterTours={filterTours} />
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
					{tours.map(tour => {
						return (
							<TourContainer
								operation="AddToFavourite"
								flag={false}
								tour={tour}
								key={tour.id}
								handleDelete={handleDelete}
							/>
						);
					})}
				</div>
			)}
		</>
	);
}
