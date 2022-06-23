import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { storage } from '../../firebase.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import { useAuth } from '../../contexts/AuthContext';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Mountain from '../../images/Mountains.avif';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

export default function AddTour() {
	const initialValues = {
		title: '',
		location: '',
		imgUrl: '',
		duration: '',
		price: '',
		date: '',
		details: ''
	};
	const [error, setError] = useState({
		status: false,
		msg: '',
		type: ''
	});
	const [loading, setLoading] = useState(false);
	const { currentUser } = useAuth();
	const [imageUrl, setimageUrl] = useState('');
	const [url, setUrl] = useState('');
	const [imageName, setImageName] = useState(null);
	const [tour, setTour] = useState(initialValues);
	const [value, setValue] = React.useState(0);
	const [File, setFile] = useState(null);
	let instaUsername = localStorage.getItem('instaUsername');
	let whatsappNo = localStorage.getItem('whatsappNo');
	let webUrl = localStorage.getItem('url');
	let CompanyName = localStorage.getItem('CompanyName');
	let CompanyEmail = localStorage.getItem('email');
	const uploadImage = async file => {
		const promise = new Promise((resolve, reject) => {
			if (!file) resolve();

			const storageRef = ref(storage, `/images/${file.name}`);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				'state_changed',
				snapshot => {
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
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

		//  if(url!='')
		// {
		//   resolve();
		// }
		// })
		return promise;
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleSubmit = async e => {
		console.log('CompanyEmail', CompanyEmail);
		setLoading(true);
		e.preventDefault();

		uploadImage(File).then(imgUrl => {
			setTour({ ...tour, imgUrl, CompanyEmail });
			const tourData = {
				...tour,
				imgUrl,
				whatsappNo,
				instaUsername,
				webUrl,
				CompanyName
			};
			console.log(tourData);

			axios
				.post(
					`http://localhost:5000/company/addtour/${CompanyEmail}`,
					tourData
				)
				.then(res => {
					console.log(res.data);
					document.getElementById('tourform').reset();
					setError({
						status: true,
						msg: 'Added a new Tour',
						type: 'success'
					});
					toast.success('Posted', {
						position: toast.POSITION.TOP_CENTER
					});
					setLoading(false);
				});
		});
	};

	const handleImage = e => {
		const file = e.target.files[0];
		const { name } = file;
		setImageName(name);
		setFile(file);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setimageUrl(reader.result);
		};
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
			<div >
				<ToastContainer />
				<Typography
					variant="h4"
					textAlign="center"
					fontWeight="bold"
					color="secondary"
				>
					Post a Tour
				</Typography>
				<Box
					sx={{
						width: '50%',
						marginLeft: 'auto',
						marginRight: 'auto',
						border: 1 / 2,
						borderColor: '#9575cd',
						boxShadow: 6,
						pt: 1,
						pb: 1,
						mt: 3
					}}
				>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="basic tabs example"
							centered
							textColor="secondary"
							indicatorColor="secondary"
						>
							<Tab label="Create Tour" {...a11yProps(0)} />
							<Tab label="Preview" {...a11yProps(1)} />
						</Tabs>
					</Box>

					{/* Add Tour form */}
					<TabPanel value={value} index={0} width="50%">
						{/* Form to create a new Tour */}

						<Box
							component="form"
							id="tourform"
							textAlign="center"
							onSubmit={handleSubmit}
						>
							<Typography
								variant="h4"
								textAlign="Left"
								color="secondary"
							>
								Tour Details
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
							<div>
								<TextField
									fullWidth
									id="title"
									name="title"
									sx={{ mt: 2 }}
									label="Tour Title"
									value={tour.title}
									onChange={handleInputChange}
									variant="filled"
									color="secondary"
								/>
								<br />
								<TextField
									fullWidth
									id="outlined-required"
									id="location"
									name="location"
									value={tour.location}
									onChange={handleInputChange}
									sx={{ mt: 4 }}
									label="Tour Location"
									variant="filled"
									required
									color="secondary"
								/>
								<br />

								<TextField
									fullWidth
									id="outlined-required"
									id="image-input"
									name="image_input"
									type="file"
									onChange={handleImage}
									sx={{ mt: 4 }}
									label="Tour Banner"
									color="secondary"
									variant="filled"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<AddAPhotoIcon />
											</InputAdornment>
										)
									}}
									focused
								/>
								{imageName && imageName ? (
									<Typography
										color="secondary"
										fontWeight="bold"
										textAlign="Left"
									>
										{imageName} is set{' '}
									</Typography>
								) : (
									<Typography
										color="secondary"
										fontWeight="bold"
										textAlign="Left"
									>
										Image is not set{' '}
									</Typography>
								)}

								<br />
								<TextField
									fullWidth
									id="outlined-required"
									id="duration"
									name="duration"
									value={tour.duration}
									onChange={handleInputChange}
									sx={{ mt: 4 }}
									label="Duration"
									variant="filled"
									color="secondary"
									required
								/>
								<br />
								<TextField
									fullWidth
									id="outlined-required"
									sx={{ mt: 4 }}
									label="Price"
									value={tour.price}
									onChange={handleInputChange}
									id="price"
									name="price"
									color="secondary"
									variant="filled"
									required
								/>
								<br />
								<TextField
									fullWidth
									id="outlined-required"
									sx={{ mt: 4 }}
									label="Starting Date"
									value={tour.date}
									onChange={handleInputChange}
									type="Date"
									id="date"
									color="secondary"
									name="date"
									variant="filled"
									required
									focused
								/>
								<br />
								<TextField
									fullWidth
									id="outlined-required"
									sx={{ mt: 4 }}
									label="Description"
									value={tour.details}
									onChange={handleInputChange}
									color="secondary"
									name="details"
									multiline
									rows={6}
									variant="filled"
									required
								/>

								<LoadingButton
									fullWidth
									type="submit"
									loading={loading}
									variant="contained"
									color="secondary"
									sx={{ mt: 3 }}
								>
									Post
								</LoadingButton>
							</div>
						</Box>
					</TabPanel>

					{/* Preview componnet  */}
					<TabPanel value={value} index={1}>
						<Box>
							<Box
								textAlign="center"
								sx={{ boxShadow: 3, borderRadius: 5 }}
							>
								<img
									src={imageUrl}
									alt="Tour Banner"
									width="100%"
									style={{ borderRadius: '20px' }}
								/>
							</Box>
							<Typography
								variant="h4"
								sx={{ mt: 4 }}
								fontWeight="bold"
								color="secondary"
								textAlign="center"
							>
								{tour.title}
							</Typography>
							<Divider sx={{ mt: 2 }} variant="middle" />
							<Typography
								variant="h6"
								sx={{ mt: 2 }}
								fontWeight="bold"
								color="secondary"
								textAlign="left"
							>
								Location:
								<span style={{ color: '#37474f' }}>
									{tour.location}
								</span>{' '}
							</Typography>
							<Typography
								variant="h6"
								sx={{ mt: 2 }}
								fontWeight="bold"
								color="secondary"
								textAlign="left"
							>
								Starting-Date:
								<span style={{ color: '#37474f' }}>
									{' '}
									{tour.date}
								</span>{' '}
							</Typography>
							<Typography
								variant="h6"
								sx={{ mt: 2 }}
								fontWeight="bold"
								color="secondary"
								textAlign="left"
							>
								Duration:
								<span style={{ color: '#37474f' }}>
									{tour.duration} days
								</span>{' '}
							</Typography>
							<Typography
								variant="h6"
								sx={{ mt: 2 }}
								fontWeight="bold"
								color="secondary"
								textAlign="left"
							>
								Price:
								<span style={{ color: '#37474f' }}>
									{tour.price} Rs
								</span>{' '}
							</Typography>
							<Divider sx={{ mt: 2 }} variant="middle" />
							<Typography
								variant="h6"
								sx={{ mt: 2 }}
								fontWeight="bold"
								textAlign="left"
								color="secondary"
							>
								Details:
							</Typography>
							<Typography
								variant="body1"
								sx={{ mt: 2 }}
								fontWeight="bold"
								color="secondary"
								textAlign="center"
							>
								<span style={{ color: '#37474f' }}>
									{tour.details}
								</span>{' '}
							</Typography>
						</Box>
					</TabPanel>
				</Box>
			</div>
		</React.Fragment>
	);
}
