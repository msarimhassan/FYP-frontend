import React, { useState } from 'react';
import { useAuth } from '.././contexts/AuthContext';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import Navbar from './Navbar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

export default function CompanySignup() {
	const [error, setError] = useState({
		status: false,
		msg: '',
		type: ''
	});
	const { Signup, verificationemail } = useAuth();
	const [loading, setLoading] = useState(false);
	 const [showPassword, setshowPassword] = useState(false);

		const handleClickShowPassword = () => {
			setshowPassword(!showPassword);
		};
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm();
	const onSubmit = async data => {
		setError({ status: false, msg: '', type: '' });
		let isVerified = null;
		setLoading(true);
		const result = await axios
			.get(
				`https://tousirmapi.herokuapp.com/getcompany/${data.CompanyName}/${data.DtsNo}`
			)
			.then(res => {
				isVerified = res.data;
				// console.log(isVerified);
			});
		if (isVerified == false) {
			setLoading(false);
			setError({
				status: true,
				msg: 'Not a verified company',
				type: 'error'
			});
			return;
		}

		// if the company is verified then we can create a new account
		else if (isVerified == true) {
			try {
				await Signup(data.CompanyEmail, data.Password).then(() => {
					axios
						.post('http://localhost:5000/company/new', data)
						.then(res => {
							console.log(res);
							verificationemail(data.CompanyEmail).then(() => {
								document
									.getElementById('CompanySignup')
									.reset();
								setError({
									status: true,
									msg: 'Account Create check your email for verification',
									type: 'success'
								});
							});
						});
				});
			} catch (err) {
				const { Error } = err;
				console.log(Error);
				setError({ status: true, msg: err.message, type: 'error' });
			}
		}

		setLoading(false);
	};

	return (
		<React.Fragment>
			<Navbar />
			<Box
				component="form"
				textAlign="center"
				id="CompanySignup"
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
					Company Signup
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
					error={errors.CompanyName}
					id="outlined-basic"
					label="Company Name"
					variant="outlined"
					color="secondary"
					{...register('CompanyName', {
						required: true,
						pattern:
							/^(?!\s)(?!.*\s$)(?=.*[a-zA-Z])[a-zA-Z0-9 '&()]{2,}$/
					})}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.CompanyName &&
					errors.CompanyName.type === 'required' && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
				{errors.CompanyName &&
					errors.CompanyName.type === 'pattern' && (
						<span style={{ color: 'red' }}>Enter a valid name</span>
					)}
				<br />
				<TextField
					fullWidth
					error={errors.CompanyEmail}
					id="outlined-basic"
					label="Company Email"
					variant="outlined"
					color="secondary"
					{...register('CompanyEmail', {
						required: true,
						pattern:
							/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					})}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.CompanyEmail &&
					errors.CompanyEmail.type === 'required' && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
				{errors.CompanyEmail &&
					errors.CompanyEmail.type === 'pattern' && (
						<span style={{ color: 'red' }}>
							Enter a valid email
						</span>
					)}
				<br />
				<TextField
					fullWidth
					error={errors.DtsNo}
					id="outlined-basic"
					label="DTS No"
					variant="outlined"
					color="secondary"
					{...register('DtsNo', { required: true })}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.DtsNo && (
					<span style={{ color: 'red' }}>This field is required</span>
				)}
				<br />

				<TextField
					fullWidth
					error={errors.Password}
					id="outlined-basic"
					label="Password"
					variant="outlined"
					type={showPassword ? 'text' : 'password'}
					color="secondary"
					{...register('Password', { required: true, minLength: 8 })}
					sx={{ mt: 3 }}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
								>
									{showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						)
					}}
				/>
				<br />
				{errors.Password && errors.Password.type === 'required' && (
					<span style={{ color: 'red' }}>This field is required</span>
				)}
				{errors.Password && errors.Password.type === 'minLength' && (
					<span style={{ color: 'red' }}>
						Password must have at least 8 characters
					</span>
				)}
				<br />
				<TextField
					fullWidth
					error={errors.Url}
					id="outlined-basic"
					label="Website URL"
					variant="outlined"
					color="secondary"
					{...register('Url', {
						required: true,
						pattern:
							/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
					})}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.Url && errors.Url.type === 'required' && (
					<span style={{ color: 'red' }}>This field is required</span>
				)}
				{errors.Url && errors.Url.type === 'pattern' && (
					<span style={{ color: 'red' }}>Enter a valid Url</span>
				)}
				<br />
				<TextField
					fullWidth
					error={errors.WhatsappNo}
					id="outlined-basic"
					label="Whatsapp Number"
					variant="outlined"
					color="secondary"
					{...register('WhatsappNo', {
						required: true,
						pattern: /^((\+92))(3)([0-9]{9})$/
					})}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.WhatsappNo && errors.WhatsappNo.type === 'required' && (
					<span style={{ color: 'red' }}>This field is required</span>
				)}
				{errors.WhatsappNo && errors.WhatsappNo.type === 'pattern' && (
					<span style={{ color: 'red' }}>
						Enter a valid number +923*********
					</span>
				)}
				<br />
				<TextField
					fullWidth
					error={errors.InstaName}
					id="outlined-basic"
					label="Instagram UserName"
					variant="outlined"
					color="secondary"
					{...register('InstaName', {
						required: true,
						pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
					})}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.InstaName && errors.InstaName.type === 'required' && (
					<span style={{ color: 'red' }}>This field is required</span>
				)}
				{errors.InstaName && errors.InstaName.type === 'pattern' && (
					<span style={{ color: 'red' }}>Enter a valid username</span>
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
					Signup
				</LoadingButton>
			</Box>
		</React.Fragment>
	);
}
