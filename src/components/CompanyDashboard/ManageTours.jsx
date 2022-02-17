import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import TourContainer from '../TourContainer';

export default function ManageTours() {
	const { currentUser } = useAuth();
	const [tours, setTours] = useState([]);
	useEffect(() => {
		fetchData();
	}, tours);

	const fetchData = async () => {
		axios
			.get(`http://localhost:5000/company/gettours/${currentUser.email}`)
			.then(res => {
				const data = res.data;
				setTours([...tours, ...data]);
			});
	};

	const handleDelete = e => {
		const id = e.target.id;
		console.log(e.target.id);
		// const newTours= tours.filter((tour)=>{
		//      return tour.id !== id
		// })

		axios
			.delete(`http://localhost:5000/company/deletetour/${id}`)
			.then(res => {
				console.log(res.data);
			});
		setTours(
			tours.filter(tour => {
				return tour.id !== id;
			})
		);
	};

	return (
		<div>
			{tours.map(tour => (
				<TourContainer tour={tour} deletefunction={handleDelete} />
			))}
		</div>
	);
}
