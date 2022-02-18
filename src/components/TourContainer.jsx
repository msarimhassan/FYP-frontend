// import React from 'react';
// import { Link } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography'
// export default function TourContainer(props) {

// 	return (
// 		<Box sx={{diplay:'flex',flexDirection:'row',border:'1px solid'}}>

// 			<Box >
// 				<img src={imgUrl} alt="" style={{height:'200px'}} />
// 			</Box>

// 			<Box>{title}</Box>

// 			{/* <button id={id} onClick={props.deletefunction}>
// 				delete
// 			</button>

// 		</Box>
// 	);
// }

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoneyIcon from '@mui/icons-material/Money';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

const ExpandMore = styled(props => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest
	})
}));

export default function TourContainer(props) {
	const {
		date,
		details,
		duration,
		email,
		id,
		imgUrl,
		location,
		price,
		title
	} = props.tour;
	const [expanded, setExpanded] = React.useState(false);

	const handleDelete = e => {
		console.log(e.target.id);
	};
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ maxWidth: 450, m: 2 }} elevation={10}>
			<CardHeader
				avatar={
					<Avatar
						sx={{ bgcolor: 'secondary.main' }}
						aria-label="Company-Email"
					>
						{email[0].toUpperCase()}
					</Avatar>
				}
				title={title}
				subheader={date}
			/>
			<CardMedia
				component="img"
				height="350"
				image={imgUrl}
				alt="Tour Banner"
			/>
			<CardContent>
				<Stack direction="row">
					<Typography variant="h6" color="text">
						{title}
					</Typography>
					<Typography
						align="right"
						variant="h6"
						sx={{
							display: 'inline-flex',
							alignItems: 'center',
							ml: 18
						}}
					>
						<LocationOnIcon sx={{ color: 'red' }} /> {location}
					</Typography>
				</Stack>
				<Typography
					variant="h6"
					sx={{ display: 'inline-flex', alignItems: 'center' }}
					align="right"
				>
					<MoneyIcon color="success" />
					{price}Rs
				</Typography>
				<Typography variant="h6" color="text.secondary">
					Duration : {duration} days
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<button id={id} onClick={props.deletefunction}>
					Delete
				</button>

				<Link to={{ pathname: 'updatetour', state: { id: id } }}>
					Update
				</Link>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>Details</Typography>
					<Typography paragraph>{details}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}
