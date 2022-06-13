import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {TextField,Typography} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import '../styles/Forgetpassword.css';
 import {Link} from 'react-router-dom';
 import forgetpassword from './../images/forgetpassword.png';

export default function Forgetpassword() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const { sendEmail } = useAuth();
	const [loading, setLoading] = useState(false);

	const onSubmit = async data => {
		setLoading(true);
		console.log(data.Email);
		sendEmail(data.Email)
			.then(() => {
				toast.success('Email sent successfully', {
					position: toast.POSITION.TOP_RIGHT
				});
				document.getElementById('forgetpassword').reset();
			})
			.catch((err)=> {
				setLoading(false);
				toast.error(err.message, {
					position: toast.POSITION.TOP_RIGHT
				});
			});
		setLoading(false);
		
	};
	return (
		// <div style={{display:'flex',justifyContent:'center',height:'100vh'}}>
		<div
			className="parent"
			style={{
				height: '70vh',
				position: 'absolute',
				top: '12%',
				right: '12%',
				left: '12%',
				textAlign: 'center'
			}}
		>
			<ToastContainer />
			<img src={forgetpassword} style={{ width: '40%' }} />
			<form onSubmit={handleSubmit(onSubmit)} id="forgetpassword">
				<h1>Forget Your Password?</h1>
				<TextField
					fullWidth
					type="email"
					label="Email"
					variant="outlined"
					color="secondary"
					{...register('Email', {
						required: true,
						pattern:
							/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					})}
					error={!!errors.Email}
					sx={{ mt: 2 }}
				/>
				<br />
				{errors.Email && errors.Email.type === 'required' && (
					<span style={{ color: 'red' }}>This field is required</span>
				)}
				{errors.Email && errors.Email.type === 'pattern' && (
					<span style={{ color: 'red' }}>Enter a valid email</span>
				)}
				<br />
				<LoadingButton
					fullWidth
					type="submit"
					loading={loading}
					variant="contained"
					color="secondary"
					sx={{ mt: 2 }}
				>
					Change
				</LoadingButton>
				<br />
				<Typography sx={{mt:2}}>
					Have an Account?
					<Link to="/">Login</Link>
				</Typography>	
			</form>
		</div>
	);
}
