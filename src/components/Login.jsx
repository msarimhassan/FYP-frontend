// import axios from 'axios';
// import React, { useRef, useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';

// export default function Login() {
// 	const [loading, setLoading] = useState(false);
// 	const emailRef = useRef();
// 	const passwordRef = useRef();

// 	const [error, setError] = useState();

// 	const handleSubmit = async e => {
// 		e.preventDefault();

// 		try {
// 			setError('');

// 	};

// 	return (
// 		<React.Fragment>
// 			<Navbar />
// 			<div className="parent">
// 				<div className="Login-form" style={{ marginTop: '50px' }}>
// 					<div style={{ marginLeft: '22px' }}>
// 						<h1>Log in.</h1>
// 						<p
// 							style={{
// 								color: 'rgba(112,112,112,0.5)',
// 								fontWeight: 'bolder'
// 							}}
// 						>
// 							Login with your data that you entered during your
// 							registration
// 						</p>
// 						<h4 style={{ color: 'red' }}>{error}</h4>
// 					</div>
// 					<form
// 						method="POST"
// 						onSubmit={handleSubmit}
// 						style={{ marginTop: '8px' }}
// 					>
// 						<div>
// 							<label htmlFor="email">Your e-mail</label>
// 							<br />
// 							<input
// 								type="email"
// 								name="email"
// 								id="email"
// 								ref={emailRef}
// 								placeholder="Enter your email"
// 								className="input-box"
// 							/>
// 						</div>
// 						<br />
// 						<div>
// 							<label htmlFor="password">Password</label>
// 							<br />
// 							<input
// 								type="password"
// 								name="password"
// 								id="password"
// 								ref={passwordRef}
// 								placeholder="Enter your password"
// 								className="input-box"
// 							/>
// 						</div>
// 						<br />
// 						<input
// 							type="submit"
// 							value="Login"
// 							name="Login"
// 							id="Login"
// 							className="Login-Button"
// 							disabled={loading}
// 						/>
// 						<br />
// 						<Link
// 							style={{ marginLeft: '52px' }}
// 							to="/forgetpassword"
// 						>
// 							Forgot Password?
// 						</Link>
// 						<p style={{ marginLeft: '10px' }}>
// 							Dont have an account{' '}
// 							<Link to="/signup">Signup</Link>
// 						</p>
// 					</form>
// 				</div>
// 			</div>
// 		</React.Fragment>
// 	);
// }

import React, { useState } from 'react';
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginWallpaper from '../images/loginWallpaper.png';
import PropTypes from 'prop-types';
import { flexbox } from '@mui/system';
import '../styles/Login.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import '../styles/Login.css';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export default function Login() {
	const [loading, setLoading] = useState(false);
	let history = useHistory();
	const { Login, Logout } = useAuth();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm();

	const onSubmit = async data => {
		console.log(data);
		setLoading(true);
		try {
			await Login(data.Email, data.Password).then(res => {
				if (res.user.emailVerified === true) {
					axios
						.get(
							`http://localhost:5000/users/findbyemail/${data.Email}`
						)
						.then(res => {
							const { isOrg } = res.data;
							localStorage.setItem('email', data.Email)
							if (isOrg === 'No') {
								history.push('/user');
							} else if (isOrg === 'Yes') {
								history.push('/company/dashboard');
							} else {
								toast.error('Login Failed', {
									position: toast.POSITION.TOP_RIGHT
								});
							}
						});
				} else {
					Logout().then(() => {
						toast.error('Please verify your Account', {
							position: toast.POSITION.TOP_RIGHT
						});
					});
				}
			});
		} catch (error) {
			console.log(error);
			toast.error(error.message, {
				position: toast.POSITION.TOP_RIGHT
			});
		}
		setLoading(false);
	};
	return (
		<React.Fragment>
			<Navbar />
			<ToastContainer />
			<div className="login-container">
				<Box>
					<img
						src={LoginWallpaper}
						className="responsive-img"
						alt=""
					/>
				</Box>

				<Box
					component="form"
					id="login"
					onSubmit={handleSubmit(onSubmit)}
					sx={{ bgcolor: '#fff', pb: 3, pl: 5, pr: 5, mt: 4, pt: 1 }}
				>
					<Typography variant="h4">Login</Typography>
					<Typography variant="caption">
						Login with your data that you entered during your
						registration
					</Typography>
					<br />
					<TextField
						sx={{ mt: 3 }}
						id="outlined-secondary"
						label="Email"
						variant="outlined"
						color="secondary"
						fullWidth
						{...register('Email', { required: true })}
						error={!!errors.Email}
					/>
					<br />
					{errors.Email && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
					<br />
					<TextField
						sx={{ mt: 2 }}
						id="outlined-secondary"
						label="Password"
						variant="outlined"
						color="secondary"
						type="Password"
						fullWidth
						{...register('Password', { required: true })}
						error={!!errors.Password}
					/>
					<br />
					{errors.Password && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}

					<Typography textAlign="right" sx={{ mt: 1 }}>
						<Link to="forgetpassword">Forgot Password?</Link>
					</Typography>
					<br />
					<LoadingButton
						fullWidth
						type="submit"
						loading={loading}
						variant="contained"
						color="secondary"
						sx={{ ml: 'auto', mr: 'auto' }}
					>
						Login
					</LoadingButton>
					<br />
					<Typography textAlign="center" sx={{ mt: 1 }}>
						Dont have an account?
						<Link to="/signup" style={{ marginLeft: '3px' }}>
							Signup
						</Link>
					</Typography>
				</Box>
			</div>
		</React.Fragment>
	);
}
