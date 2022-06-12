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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
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
	const [showPassword, setshowPassword] = useState(false);
	const [showPassword2, setshowPassword2] = useState(false);
	const handleClickShowPassword = () => {
		setshowPassword(!showPassword);
	};

	const handleClickShowPassword2 = () => {
		setshowPassword2(!showPassword2);
	};

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
						type={showPassword ? 'text' : 'password'}
						variant="outlined"
						color="secondary"
						{...register('Password', {
							required: true,
							minLength: 8
						})}
						error={!!errors.Password}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
									>
										{showPassword ? (
											<Visibility />
										) : (
											<VisibilityOff />
										)}
									</IconButton>
								</InputAdornment>
							)
						}}
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
						type={showPassword2 ? 'text' : 'password'}
						variant="outlined"
						color="secondary"
						{...register('CPassword', {
							required: true,
							validate: value => value === password.current
						})}
						error={!!errors.CPassword}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword2}
									>
										{showPassword2 ? (
											<Visibility />
										) : (
											<VisibilityOff />
										)}
									</IconButton>
								</InputAdornment>
							)
						}}
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
