import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useEffect } from 'react';
export default function UpdateTour(props) {
	useEffect(() => {
		fetchData();
	}, []);
	const { location } = props;
	const { currentUser } = useAuth();
	const [tour, setTour] = useState(null);

	//for fetching the document from the backend
	const fetchData = () => {
		axios
			.get(
				`http://localhost:5000/company/gettour/${props.location.state.id}`
			)
			.then(res => {
				console.log(res.data);
			});
	};

	return (
		<div>
			<h1>{props.location.state.id}</h1>
			<Link to="managetours">back</Link>
		</div>
	);
}
