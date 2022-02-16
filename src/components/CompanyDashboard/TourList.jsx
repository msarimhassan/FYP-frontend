import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function TourList() {
	return (
		<List
			sx={{
				width: '100%',
				bgcolor: 'background.paper',
				position: 'relative',
				overflow: 'auto',
				maxHeight: 350,
				'& ul': { padding: 0 }
			}}
			subheader={<li />}
		>
			{/* {[0, 1, 2, 3, 4].map((sectionId) => ( */}

			<ul>
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 11, 14, 15].map(
					item => (
						<ListItem key={`item-${item}`}>
							<Box>{item}</Box>
						</ListItem>
					)
				)}
			</ul>

			{/* ))} */}
		</List>
	);
}
