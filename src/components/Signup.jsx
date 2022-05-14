// import React, { useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import axios from 'axios';
// import '../styles/Signup.css';
// import ClipLoader from 'react-spinners/ClipLoader';

// export default function Signup() {
// 	//import my custom hook
// 	const { Signup, verificationemail } = useAuth();
// 	// display error on the component
// 	const [error, setError] = useState('');
// 	//this helps me to avoid in creating multiple accounts
// 	const [loading, setLoading] = useState(false);

// 	// Defines the attributes for the user credentials
// 	const nameRef = useRef();
// 	const emailRef = useRef();
// 	const passRef = useRef();
// 	const confirmpassRef = useRef();
// 	const [gender, setGender] = useState('');

// 	//handles the changing value of gender
// 	const handleChange = e => {
// 		const { name, value } = e.target;
// 		setGender(value);
// 	};
// 	//handles my form submission
// 	const handleSubmit = async e => {
// 		e.preventDefault();
// 		if (passRef.current.value !== confirmpassRef.current.value) {
// 			return setError('Password doesnt match');
// 		}
// 		const obj = {
// 			name: nameRef.current.value,
// 			email: emailRef.current.value,
// 			gender: gender,
// 			isOrg: 'No'
// 		};
// 		try {
// 			setError('');
// 			setLoading(true);
// 			const result = await Signup(
// 				emailRef.current.value,
// 				passRef.current.value
// 			).then(() => {
// 				axios.post('http://localhost:5000/users/new', obj).then(res => {
// 					console.log(res);
// 					verificationemail(emailRef.current.value).then(() => {
// 						nameRef.current.value = '';
// 						emailRef.current.value = '';
// 						passRef.current.value = '';
// 						confirmpassRef.current.value = '';

// 						setError('Check Your email for verification');
// 						alert('Account Created');
// 						setLoading(false);
// 					});
// 				});
// 			});
// 		} catch (error) {
// 			setError(error.message);
// 			console.log(error, 'Error');
// 		}
// 		setLoading(false);
// 	};
// 	return loading ? (
// 		<div
// 			style={{
// 				display: 'flex',
// 				alignItems: 'center',
// 				flexDirection: 'column',
// 				justifyContent: 'center',
// 				marginTop: '100px'
// 			}}
// 		>
// 			<ClipLoader color={'#CE0CA0'} loading={loading} size={100} />
// 			<h2 style={{ color: '#CE0CA0' }}>Loading</h2>
// 		</div>
// 	) : (
// 		<div className="parent">
// 			<div className="Signup-form">
// 				<h1>Sign up.</h1>
// 				<h4 style={{ color: 'red' }}>{error}</h4>
// 				<form onSubmit={handleSubmit} method="POST">
// 					<div>
// 						<label htmlFor="Name">Name</label>
// 						<br />
// 						<input
// 							type="text"
// 							name="Name"
// 							id="Name"
// 							ref={nameRef}
// 							placeholder="Enter your name"
// 							className="input-box"
// 						/>
// 					</div>
// 					<br />
// 					<div>
// 						<label htmlFor="email">Email</label>
// 						<br />
// 						<input
// 							type="email"
// 							name="email"
// 							id="email"
// 							ref={emailRef}
// 							placeholder="name@domain.com"
// 							className="input-box"
// 						/>
// 					</div>
// 					<br />
// 					<div>
// 						<label htmlFor="password">Password</label>
// 						<br />
// 						<input
// 							type="password"
// 							name="password"
// 							id="password"
// 							ref={passRef}
// 							minLength="8"
// 							placeholder="at least 8 characters"
// 							className="input-box"
// 						/>
// 					</div>
// 					<br />
// 					<div>
// 						<label htmlFor="confirm password">
// 							Confirm Password
// 						</label>
// 						<br />
// 						<input
// 							type="password"
// 							name="confirmpass"
// 							id="confirmpass"
// 							ref={confirmpassRef}
// 							placeholder="Confirm your Password"
// 							className="input-box"
// 						/>
// 					</div>
// 					<br />
// 					<div onChange={handleChange}>
// 						<label htmlFor="Gender">Gender</label>
// 						<br />
// 						<input
// 							type="radio"
// 							name="Gender"
// 							id="Gender"
// 							value="Male"
// 						/>{' '}
// 						Male
// 						<input
// 							type="radio"
// 							name="Gender"
// 							id="Gender"
// 							value="Female"
// 							style={{ marginLeft: '5px' }}
// 						/>{' '}
// 						Female
// 					</div>
// 					<br />
// 					<input
// 						type="submit"
// 						value="Signup"
// 						name="Signup"
// 						id="Signup"
// 						disabled={loading}
// 						className="Signup-Button"
// 					/>
// 					<p>
// 						Already have an account? <Link to="/">LogIn</Link>
// 					</p>
// 				</form>
// 			</div>
// 		</div>
// 	);
// }
import React, { useState, useRef } from 'react';
import { Typography, Box, TextField } from '@mui/material';
import '../styles/Signup.css';
import { useForm } from 'react-hook-form';
import SignupWallpaper from '../images/signup.png';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Signup() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm();

	const { Signup, verificationemail } = useAuth();
	const password = useRef();
	password.current = watch('Password');

	const [loading, setLoading] = useState(false);

	const onSubmit = async data => {
		const { Email, Password } = data;
		setLoading(true);
		try {
			await Signup(Email, Password).then(() => {
				axios.post('http://localhost:5000/users/new', data).then(() => {
					verificationemail(Email).then(() => {
						toast.success('Check Your Email', {
							position: toast.POSITION.TOP_RIGHT
						});
						document.getElementById('signup').reset();
					});
				});
			});
		} catch (error) {
			toast.error(error.message, {
				position: toast.POSITION.TOP_RIGHT
			});
		}

		setLoading(false);
	};
	return (
		<>
			<ToastContainer />
			<Navbar />
			<div className="parent">
				<Box
					component="form"
					id="signup"
					onSubmit={handleSubmit(onSubmit)}
					sx={{ pb: 2, pt: 2 }}
				>
					<Typography variant="h4">Signup</Typography>
					<Typography variant="caption">
						Please provide all required details to register yourself
					</Typography>
					<TextField
						fullWidth
						size="small"
						sx={{ mt: 2 }}
						id="outlined-secondary"
						label="Name"
						variant="outlined"
						color="secondary"
						{...register('Name', {
							required: true,
							pattern: /^[a-zA-Z ]*$/
						})}
						error={!!errors.Name}
					/>
					<br />
					{errors.Name && errors.Name.type === 'required' && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
					{errors.Name && errors.Name.type === 'pattern' && (
						<span style={{ color: 'red' }}>Enter a valid name</span>
					)}
					<br />
					<TextField
						fullWidth
						size="small"
						sx={{ mt: 1 }}
						id="outlined-secondary"
						label="Email"
						type="email"
						variant="outlined"
						color="secondary"
						{...register('Email', {
							required: true,
							pattern:
								/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						})}
						error={!!errors.Email}
					/>
					<br />
					{errors.Email && errors.Email.type === 'required' && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
					{errors.Email && errors.Email.type === 'pattern' && (
						<span style={{ color: 'red' }}>
							Enter a valid email
						</span>
					)}
					<br />
					<TextField
						size="small"
						sx={{ mt: 1 }}
						fullWidth
						id="outlined-secondary"
						label="Password"
						type="password"
						variant="outlined"
						color="secondary"
						{...register('Password', {
							required: true,
							minLength: 8
						})}
						error={!!errors.Password}
					/>
					<br />
					{errors.Password && errors.Password.type === 'required' && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
					{errors.Password &&
						errors.Password.type === 'minLength' && (
							<span style={{ color: 'red' }}>
								Password must have at least 8 characters
							</span>
						)}
					<br />
					<TextField
						size="small"
						fullWidth
						sx={{ mt: 1 }}
						id="outlined-secondary"
						label="Confirm Password"
						type="password"
						variant="outlined"
						color="secondary"
						{...register('CPassword', {
							required: true,
							validate: value => value === password.current
						})}
						error={!!errors.CPassword}
					/>
					<br />
					{errors.CPassword &&
						errors.CPassword.type === 'required' && (
							<span style={{ color: 'red' }}>
								This field is required
							</span>
						)}
					{errors.CPassword &&
						errors.CPassword.type === 'validate' && (
							<span style={{ color: 'red' }}>
								The passwords do not match
							</span>
						)}
					<br />
					<FormControl sx={{ mt: 1 }}>
						<FormLabel id="demo-radio-buttons-group-label">
							Gender
						</FormLabel>
						<RadioGroup
							row
							aria-labelledby="demo-radio-buttons-group-label"
							name="radio-buttons-group"
						>
							<FormControlLabel
								value="Male"
								control={<Radio />}
								label="Male"
								{...register('Gender', { required: true })}
								error={!!errors.Gender}
							/>
							<FormControlLabel
								value="Female"
								control={<Radio />}
								label="Female"
								{...register('Gender', { required: true })}
								error={!!errors.Gender}
							/>
						</RadioGroup>
						{errors.Gender && (
							<span style={{ color: 'red' }}>
								This field is required
							</span>
						)}
						<br />
					</FormControl>
					<br />
					<LoadingButton
						size="small"
						fullWidth
						type="submit"
						loading={loading}
						variant="contained"
						color="secondary"
						sx={{ ml: 'auto', mr: 'auto' }}
					>
						Create Account
					</LoadingButton>
					<br />
					<Typography textAlign="center" sx={{ mt: 1 }}>
						Already have an account?
						<Link to="/" style={{ marginLeft: '3px' }}>
							Login
						</Link>
					</Typography>
				</Box>
				<Box>
					<img
						src={SignupWallpaper}
						alt="Signup-wallpaper"
						className="responsive-img2"
					/>
				</Box>
			</div>
		</>
	);
}
