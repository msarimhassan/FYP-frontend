import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ManageTours() {
	
	const { currentUser } = useAuth();
	const [tours, setTours] = useState([]);
	useEffect(() => {
		fetchData();
	}, tours);

	const fetchData = async () => {
		const result = await axios.get(
			`http://localhost:5000/company/gettours/${currentUser.email}`
		);
		const data = result.data;
		console.log(data);
		setTours([...tours, ...data]);
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
			<h1>Data</h1>
			{tours.map(tour => (
				<div>
					<h1>{tour.title}</h1>
					<h1>{tour.id}</h1>
					<button id={tour.id} onClick={handleDelete}>
						Delete
					</button>
					<Link
						to={{ pathname: 'updatetour', state: { id: tour.id } }}
					>
						Update
					</Link>
				</div>
			))}
		</div>
	);
}
