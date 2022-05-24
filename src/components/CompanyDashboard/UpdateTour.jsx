import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import MyLoader from '../MyLoader';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import InputAdornment from '@mui/material/InputAdornment';
import {
	getDownloadURL,
	ref,
	uploadBytesResumable,
	deleteObject
} from 'firebase/storage';
import { storage } from '../../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateTour(props) {
	const initialValues = {
		title: '',
		location: '',
		imgUrl: '',
		duration: '',
		price: '',
		date: '',
		details: ''
	};
	const [tour, setTour] = useState(null);
	const [imgUrl, setUrl] = useState(null);

	const [render, setRender] = useState(true);
	const [File, setFile] = useState(null);
	const { currentUser } = useAuth();
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState({
		status: false,
		msg: '',
		type: ''
	});

	useEffect(() => {
		fetchData();
	}, []);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors }
	} = useForm();

	//for fetching the document from the backend
	const fetchData = () => {
		axios
			.get(
				`http://localhost:5000/company/gettour/${props.location.state.id}`
			)
			.then(res => {
				setTour(res.data);
				setRender(false);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const uploadImage = async file => {
		const promise = new Promise((resolve, reject) => {
			if (file === null) {
				console.log('No file');
				setUrl(tour.imgUrl);
				resolve(tour.imgUrl);
				return;
			}

			const imgRef = ref(storage, tour.imgUrl);
			deleteObject(imgRef).then(() => {
				const storageRef = ref(storage, `/images/${file.name}`);
				const uploadTask = uploadBytesResumable(storageRef, file);
				uploadTask.on(
					'state_changed',
					snapshot => {
						const progress = Math.round(
							(snapshot.bytesTransferred / snapshot.totalBytes) *
								100
						);
					},
					err => {
						console.log(err);
						reject(err);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(url => {
							setUrl(url);
							resolve(url);
						});
					}
				);
			});
		});
		return promise;
	};

	const onSubmit = async data => {
		setLoading(true);

		uploadImage(File).then(imgUrl => {
			const tourData = {
				...data,
				imgUrl
			};
			console.log(tourData);
			axios
				.put('http://localhost:5000/company/updateTour', tourData)
				.then(res => {
					console.log(res.data);
					toast.success('Updated', {
						position: toast.POSITION.TOP_CENTER
					});
					document.getElementById('UpdateTour').reset();
				})
				.catch(err => {
					console.log(err);
				});
			setLoading(false);
		});
	};

	const handleImage = e => {
		const file = e.target.files[0];
		const { name } = file;
		setFile(file);
		console.log(file);
	};
	const handleInputChange = e => {
		const { name, value } = e.target;
		setTour({
			...tour,
			[name]: value
		});
	};

	return (
		<React.Fragment>
			<ToastContainer />
			{render ? (
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
						id={1}
					/>
				</div>
			) : (
				<Box
					component="form"
					textAlign="center"
					id="UpdateTour"
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						border: 0,
						width: '50%',
						ml: 'auto',
						mr: 'auto',
						boxShadow: 3,
						borderRadius: 4,
						pb: 5,
						pl: 5,
						pr: 5,
						mt: 5,
						mb: 5,
						bgcolor: '#fff'
					}}
				>
					<Typography
						variant="h4"
						fontWeight="bolder"
						textAlign="left"
						sx={{ pt: 4 }}
					>
						Update Tour
					</Typography>
					{error.status ? (
						<Alert
							sx={{ mt: 1 }}
							variant="outlined"
							severity={error.type}
						>
							{error.msg}
						</Alert>
					) : (
						''
					)}
					<TextField
						fullWidth
						error={errors.id}
						id="outlined-basic"
						label="Id"
						type="hidden"
						variant="outlined"
						color="secondary"
						{...register('id', { required: true })}
						sx={{ mt: 3, display: 'none' }}
						value={props.location.state.id}
						focused
					/>
					<TextField
						fullWidth
						error={errors.title}
						id="outlined-basic"
						label="Tour Title"
						variant="outlined"
						color="secondary"
						{...register('title', { required: true })}
						sx={{ mt: 3 }}
						value={tour.title}
						onChange={handleInputChange}
						focused
					/>
					<br />
					{errors.title && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
					<br />
					<TextField
						fullWidth
						error={errors.location}
						id="outlined-basic"
						label="Location"
						variant="outlined"
						color="secondary"
						{...register('location', {
							required: true
						})}
						sx={{ mt: 3 }}
						value={tour.location}
						onChange={handleInputChange}
						focused
					/>
					<br />
					{errors.location && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
					<br />
					<TextField
						fullWidth
						error={errors.imgUrl}
						id="outlined-basic"
						label="Tour Banner"
						type="file"
						variant="outlined"
						color="secondary"
						onChange={handleImage}
						// {...register('imgUrl', { required: true })}
						sx={{ mt: 3 }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AddAPhotoIcon />
								</InputAdornment>
							)
						}}
						focused
					/>

					<br />
					{errors.imgUrl && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
					<img
						src={tour.imgUrl}
						alt=""
						style={{ width: '280px', marginTop: '10px' }}
					/>
					<br />
					<TextField
						fullWidth
						error={errors.duration}
						id="outlined-basic"
						label="Duration"
						variant="outlined"
						color="secondary"
						{...register('duration', { required: true })}
						sx={{ mt: 3 }}
						onChange={handleInputChange}
						value={tour.duration}
						focused
					/>
					<br />
					{errors.duration && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
					<br />

					<TextField
						fullWidth
						error={errors.price}
						id="outlined-basic"
						label="Price"
						variant="outlined"
						color="secondary"
						{...register('price', { required: true })}
						sx={{ mt: 3 }}
						value={tour.price}
						onChange={handleInputChange}
						focused
					/>
					<br />
					{errors.price && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
					<br />
					<TextField
						fullWidth
						error={errors.Url}
						id="outlined-basic"
						label="Starting Date"
						variant="outlined"
						type="date"
						color="secondary"
						{...register('date', { required: true })}
						sx={{ mt: 3 }}
						onChange={handleInputChange}
						value={tour.date}
						focused
					/>
					<br />
					{errors.date && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
					<br />

					<TextField
						fullWidth
						error={errors.details}
						id="outlined-basic"
						multiline
						rows={6}
						label="Tour Details"
						variant="outlined"
						color="secondary"
						{...register('details', { required: true })}
						sx={{ mt: 3 }}
						value={tour.details}
						onChange={handleInputChange}
						focused
					/>
					<br />
					{errors.details && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
					<br />
					<LoadingButton
						fullWidth
						type="submit"
						loading={loading}
						variant="contained"
						color="secondary"
						sx={{ mt: 3 }}
					>
						Update
					</LoadingButton>
				</Box>
			)}
		</React.Fragment>
	);
}
