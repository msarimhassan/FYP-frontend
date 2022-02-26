import React from 'react';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import {Link} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarRateIcon from '@mui/icons-material/StarRate';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#df73ff',
  ...theme.typography.h4,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: '#fff',
  width:'300px',
}));

export default function Tiles() {
	return (
		<React.Fragment>
	<Stack direction="row" spacing={2} justifyContent='flex-end' sx={{mr:5}}>
		   <Link to="/company/addtour" style={{textDecoration:'none'}}><Chip icon={<AddIcon /> } color="secondary" label="Add Tour"  /></Link>
	   <Link to="/company/addtour" style={{textDecoration:'none'}}><Chip icon={<EditIcon />} color="secondary" label="Manage Tours" /></Link>
	</Stack>
	   <Stack
	   width='80%'
        direction={{ xs: 'column', sm: 'row' }}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
		justifyContent='center'
		alignItems='center'
		sx={{mt:5,bgcolor:'#df73ff',pt:5,pb:5,boxShadow:3,borderRadius:10,ml:'auto',mr:'auto'}}
		
      >
        <Item elevation={0}>
			<Typography  variant="h4"><ArrowUpwardIcon/>Tours Count</Typography>
			0
			<Typography  variant="body2">There are 0 tours in your database</Typography>
		</Item>
        <Item elevation={0}>
			<Typography  variant="h4"><FavoriteIcon/>Liked</Typography>
		0
		<Typography  variant="body2">Total liked by our users</Typography>
		</Item>
        <Item elevation={0}>
			<Typography  variant="h4">< StarRateIcon/>Ratings</Typography>
			0
			<Typography  variant="body2">Ratings based on experience</Typography>
		</Item>
      </Stack>
		</React.Fragment>
	);
}
