// import React,{useRef,useState} from 'react'

// export default function AddTour() {
//
//      const locationRef=useRef();
//      const daysRef=useRef();
//      const priceRef=useRef();
//      const descriptionRef=useRef();

//     const handleSubmit =(e)=>{

//          e.preventDefault()
//          const file=e.target[2].files[0]
//          uploadImage(file);

//     }

//     }
//     return (
//         <div>
//          <form onSubmit={handleSubmit}>
//              <div>
//                  <label htmlFor="Title">Trip Title</label>
//              <br />
//              <input type="text" name='title' ref={titleRef} placeholder='Enter your tour title' required/>
//              </div>
//              <br />
//             <div>
//                  <label htmlFor="Location">Trip Location</label>
//              <br />
//              <input type="text" name='location' ref={locationRef} placeholder='Enter location' required/>
//             </div>
//              <br />
//              <div>
//              <label htmlFor="tripBanner">Attach Trip Banner </label>
//             <br />
//             <input type="file"  name="banner" required/>
//              </div>
//             <br />
//            <div>
//             <label htmlFor="Day">Duration of trip</label>
//             <br />
//             <input type="text" name="Duration" ref={daysRef} placeholder='Enter duration' required/>
//            </div>
//             <br />
//             <div>
//              <label htmlFor="Price">Price</label>
//              <br />
//              <input type="text" name="Price" ref={priceRef} placeholder='Enter the price' required />
//             </div>
//              <br />
//              <div>
//             <label htmlFor="Description">Description</label>
//              <br />
//              <textarea name="descroption" id="description" cols="30" rows="10" ref={descriptionRef} placeholder='Describe the trip' required></textarea>
//              </div>
//              <br />
//             <input type="Submit" name="submit" />
//          </form>
//         </div>
//     )
// }
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { storage } from '../../firebase.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Divider from '@mui/material/Divider';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

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

export default function BasicTabs() {
	const initialValues = {
		title: '',
		location: '',
		imgUrl: '',
		duration: '',
		price: '',
		date: '',
		details: ''
	};

	const { currentUser } = useAuth();
	const [imageUrl, setimageUrl] = useState('');
	const [url, setUrl] = useState('');
	const [imageName, setImageName] = useState(null);
	const [tour, setTour] = useState(initialValues);
	const [value, setValue] = React.useState(0);
	const [File, setFile] = useState(null);

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
		e.preventDefault();

		// uploadImage(File)
		uploadImage(File).then((url) => {
			setTour({ ...tour, imgUrl: url });

		// 	 axios
		// 		.post(
		// 			`http://localhost:5000/company/addtour/${currentUser.email}`,
		// 			tour
		// 		)
		// 		.then(res => {
		// 			console.log(res.data);
		// 		});
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
						id="tour-detail-form"
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
								id="details"
								color="secondary"
								name="details"
								multiline
								rows={6}
								variant="filled"
								required
							/>

							<Button
								fullWidth
								variant="contained"
								type="submit"
								color="secondary"
								sx={{ boxShadow: 6, mt: 4 }}
							>
								Post
							</Button>
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
		</React.Fragment>
	);
}
