import React from 'react';
import Box from '@mui/material/Box';
import banner from '.././images/banner.PNG';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
export default function TourContainer() {
	return (
		<Grid
			container
			sx={{ boxShadow: 3, bgcolor: '#fff', width: '50%', height: '25%' }}
		>
			<Grid lg={2} item>
				<Box textAlign="center" sx={{ ml: 1, mt: 1 / 2 }}>
					<img src={banner} style={{ borderRadius: '20px' }} alt="" />
				</Box>
			</Grid>
			<Grid lg={2} item>
				<Typography variant="h5">Trip to kashmir</Typography>
				<Stack direction="column">
					<Typography variant="subtitle1">Duration: 3</Typography>
					<Typography variant="subtitle1">
						Location: kashmir
					</Typography>
					<Typography variant="subtitle1">
						Starting From: 2022-02-01
					</Typography>
				</Stack>
			</Grid>
			<Grid lg={1} item>
				<Typography variant="h5">10,000</Typography>
			</Grid>
		</Grid>
	);
}
