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

export default function CompanySignup() {
	const [error, setError] = useState({
		status: false,
		msg: '',
		type: ''
	});
	const { Signup, verificationemail } = useAuth();
	const [loading, setLoading] = useState(false);
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
					{...register('CompanyName', { required: true })}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.CompanyName && (
					<span style={{ color: 'red' }}>This field is required</span>
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
							/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
					})}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.CompanyEmail && (
					<span style={{ color: 'red' }}>Enter a valid Email</span>
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
					color="secondary"
					{...register('Password', { required: true, min: 8 })}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.CompanyName && (
					<span style={{ color: 'red' }}>
						Password must be 8 characters
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
					{...register('Url', { required: true })}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.Url && (
					<span style={{ color: 'red' }}>This field is required</span>
				)}
				<br />
				<TextField
					fullWidth
					error={errors.WhatsappNo}
					id="outlined-basic"
					label="Whatsapp Number"
					variant="outlined"
					color="secondary"
					{...register('WhatsappNo', { required: true })}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.WhatsappNo && (
					<span style={{ color: 'red' }}>This field is required</span>
				)}
				<br />
				<TextField
					fullWidth
					error={errors.InstaName}
					id="outlined-basic"
					label="Instagram UserName"
					variant="outlined"
					color="secondary"
					{...register('InstaName', { required: true })}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.InstaName && (
					<span style={{ color: 'red' }}>This field is required</span>
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
