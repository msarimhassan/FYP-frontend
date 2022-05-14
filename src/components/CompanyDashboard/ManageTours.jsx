import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import TourContainer from '../TourContainer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { storage } from '../../firebase';
import { ref, deleteObject } from 'firebase/storage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyLoader from '../MyLoader';

export default function ManageTours() {
	const { currentUser } = useAuth();
	const [tours, setTours] = useState([]);
	const [open, setOpen] = React.useState(false);
	const [render, setRender] = useState(false);

	useEffect(() => {
		fetchData();
	}, tours);

	const fetchData = async () => {
		const email = localStorage.getItem('email');
		axios
			.get(`http://localhost:5000/company/gettours/${email}`)
			.then(res => {
				const data = res.data;
				setTours([...tours, ...data]);
				setRender(true);
			});
	};

	const handleDelete = e => {
		const id = e.target.id;
		let deletedUrl = null;
		console.log(e.target.id);

		for (let i = 0; i < tours.length; i++) {
			if (tours[i].id === id) {
				deletedUrl = tours[i].imgUrl;
			}
		}
		if (deletedUrl !== '') {
			const imgRef = ref(storage, deletedUrl);

			console.log(imgRef);
			deleteObject(imgRef).then(() => {
				axios
					.delete(`http://localhost:5000/company/deletetour/${id}`)
					.then(res => {
						console.log(res.data);
						setOpen(true);
						setTours(
							tours.filter(tour => {
								return tour.id !== id;
							})
						);
					});
			});
			toast.success('Deleted', {
				position: toast.POSITION.TOP_CENTER
			});
		} else {
			axios
				.delete(`http://localhost:5000/company/deletetour/${id}`)
				.then(res => {
					console.log(res.data);
					setOpen(true);
					setTours(
						tours.filter(tour => {
							return tour.id !== id;
						})
					);
				});
			toast.success('Deleted', {
				position: toast.POSITION.TOP_CENTER
			});
		}
	};

	return (
		<React.Fragment>
			<ToastContainer />
			{/* Tour Cards */}
			{render ? (
				<Box sx={{ maxWidth: 450, m: 'auto' }}>
					{tours.length > 0 ? (
						tours.map(tour => (
							<TourContainer
							  flag={true}
								tour={tour}
								deletefunction={handleDelete}
							/>
						))
					) : (
						<Typography variant="h1" sx={{ textAlign: 'center' }}>
							No tours to display
						</Typography>
					)}
				</Box>
			) : (
				<div style={{display:'flex',justifyContent:'center',height:'100vh'}}>
					<MyLoader
					style={{ justifyContent: 'center', alignItems: 'center' }}
					id={2}
				/>
				</div>
			)}
		</React.Fragment>
	);
}
