import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import family from '../../images/family.jpg';
import TourList from './TourList';
import TourContainer from '../TourContainer';

export default function Tiles() {
	return (
		<React.Fragment>
			<Grid
				container
				justifyContent="center"
				width="80%"
				sx={{
					bgcolor: 'rgba(186,104,200,0.5)',
					borderRadius: 4,
					ml: 'auto',
					mr: 'auto'
				}}
			>
				<Grid item lg={2} md={3} sm={5} xs={5}>
					<Box
						sx={{
							textAlign: 'center',
							borderRadius: 8,
							boxShadow: 3,
							backgroundColor: '#F18A15'
						}}
					>
						<img
							src={family}
							alt="family"
							style={{ width: '100%', borderRadius: '20px' }}
						/>
						<Typography variant="h6" mt={2} color={'#fff'}>
							Total Tours
						</Typography>

						<Typography variant="h3" color={'#fff'}>
							0
						</Typography>
					</Box>
				</Grid>

				{/* new grid item  */}

				<Grid item lg={8} xs={10}>
					<TourList />
				</Grid>
			</Grid>

			<TourContainer />
		</React.Fragment>
	);
}
