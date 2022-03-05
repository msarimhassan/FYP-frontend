import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
export default function CompanyProfile() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm();

	const onSubmit = async data => {
		console.log(data);
	};

	return (
		<>
			<Typography variant="h4">Profile</Typography>
			<Box
				component="form"
				id="CompanyProfile"
				onSubmit={handleSubmit(onSubmit)}
			>
				<TextField
					error={errors.CompanyName}
					id="outlined-basic"
					label="Company Name"
					variant="outlined"
					color="secondary"
					{...register('CompanyName', { required: true })}
				/>
				<TextField
					error={errors.DtsNo}
					id="outlined-basic"
					label="Dts No"
					variant="outlined"
					color="secondary"
					{...register('DtsNo', { required: true })}
					sx={{ ml: 1 }}
				/>
				<br />
				<TextField
					error={errors.CompanyEmail}
					id="outlined-basic"
					label="Company Email"
					variant="outlined"
					color="secondary"
					{...register('CompanyEmail', { required: true })}
				/>
			</Box>
		</>
	);
}
