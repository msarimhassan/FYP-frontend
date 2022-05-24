import React, { useState } from 'react';
import { TextField, Stack, InputAdornment, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import PlaceIcon from '@mui/icons-material/Place';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DateRangeIcon from '@mui/icons-material/DateRange';

const Item = styled(Paper)(({ theme }) => ({
	textAlign: 'center'
}));

export default function SearchBox({ filterTours}) {
	const [obj, setObj] = useState({
		location: '',
		price: '',
		days: ''
	});
	

	return (
		<div>
			<Stack
				direction="row"
				divider={<Divider orientation="vertical" flexItem />}
				spacing={2}
			>
				<Item>
					<TextField
						placeholder="Place"
						onChange={e => {
							filterTours(e);
						}}
						variant="filled"
						name="location"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<PlaceIcon color="secondary" />
								</InputAdornment>
							)
						}}
					/>
				</Item>
				<Item>
					<TextField
						placeholder="Price"
						variant="filled"
						name="price"
						onChange={e => {
							filterTours(e);
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AttachMoneyIcon color="secondary" />
								</InputAdornment>
							)
						}}
					/>
				</Item>
				<Item>
					<TextField
						placeholder="Days"
						variant="filled"
						name="days"
						onChange={e => {
							filterTours(e);
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<DateRangeIcon color="secondary" />
								</InputAdornment>
							)
						}}
					/>
				</Item>
			</Stack>
		</div>
	);
}
