import React, { useState } from 'react';
import { Box,Grid, Typography, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import  axios  from 'axios';
import{ToastContainer,toast} from 'react-toastify';

export default function Feedback() {
	const [value, setValue] = React.useState('female');
    const[loading,setLoading]=useState(false)
	const handleChange = event => {
		setValue(event.target.value);
	};
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const onSubmit=async data=>{
		setLoading(true);
		console.log(data);

		axios.post('http://localhost:5000/users/submit-feedback',data).then((res)=>{
			console.log(res);
				toast.success('Your Feedback is recorded' ,{
					position: toast.POSITION.TOP_CENTER
				});
			setLoading(false);
		}).catch(err=>{
			toast.error(err.message, {
				position: toast.POSITION.TOP_CENTER
			});
		})
	}

	return (
		<Box
			sx={{ flexGrow: 1, width: '50%', mx: 'auto' }}
			component="form"
			onSubmit={handleSubmit(onSubmit)}
		>
			<ToastContainer/>
			<Typography variant="h4" component="h2">
				Feedback form
			</Typography>
			<Typography variant="subtitle2" gutterBottom component="div">
				We would love to hear your thoughts,suggestions,concerns or
				problems with anything so we can improve
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} md={12}>
					<FormControl>
						<FormLabel id="demo-row-radio-buttons-group-label">
							Feedback Type
						</FormLabel>
						<RadioGroup
							row
							aria-labelledby="demo-controlled-radio-buttons-group"
							name="controlled-radio-buttons-group"
							value={value}
							onChange={handleChange}
						>
							<FormControlLabel
								value="comments"
								control={<Radio />}
								label="Comments"
								{...register('Type', { required: true })}
								error={!!errors.Type}
							/>
							<FormControlLabel
								value="suggestions"
								control={<Radio />}
								label="Suggestions"
								{...register('Type', { required: true })}
								error={!!errors.Type}
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				{errors.Type && (
					<span style={{ color: 'red' }}>This field is required</span>
				)}

				<Grid item xs={12} md={12}>
					<TextField
						id="outlined-required"
						multiline
						rows={6}
						fullWidth
						color="secondary"
						label="Describe Your Feedback"
						{...register('feedBack', { required: true })}
						error={!!errors.feedBack}
					/>
					{errors.feedBack && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
				</Grid>

				<Grid item xs={12} md={6}>
					<Typography>Company Name</Typography>

					<TextField
						color="secondary"
						{...register('companyName', { required: true })}
						error={!!errors.companyName}
					/>
					<br />
					{errors.companyName && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
				</Grid>

				<Grid item xs={12} md={6}>
					<Typography>Your Email</Typography>
					<TextField
						color="secondary"
						{...register('userEmail', { required: true })}
						error={!!errors.userEmail}
					/>
					<br />
					{errors.userEmail && (
						<span style={{ color: 'red' }}>
							This field is required
						</span>
					)}
				</Grid>
				<Grid item xs={12} md={12} sx={{mb:5}}>
					<LoadingButton
						fullWidth
						type="submit"
						variant="contained"
						color="secondary"
						loading={loading}
					>
						Submit
					</LoadingButton>
				</Grid>
			</Grid>
		</Box>
	);
}
