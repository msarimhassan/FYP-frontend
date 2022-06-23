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
import { NavLink, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Chip from '@mui/material/Chip';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
	const useremail = localStorage.getItem('email');
	const {
		date,
		details,
		duration,
		email,
		id,
		imgUrl,
		location,
		price,
		title,
		companyName,
		whatsappNo,
		instaUsername,
		url,
		
	} = props.tour;
	//Converting my whatsappNo in international format

	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const AddToFavourite = async () => {
		const obj = {
			date,
			details,
			duration,
			imgUrl,
			location,
			price,
			title,
			useremail,
			companyName,
			whatsappNo,
			instaUsername,
			url,
			id
		};
		console.log(obj);
		// save into the firebase
		try {
			axios
				.post('http://localhost:5000/users/addfavourite', obj)
				.then(res => {
					toast.success('Added To Favourites', {
						position: toast.POSITION.TOP_CENTER
					});
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card sx={{ maxWidth: 450, m: 2 }} elevation={10}>
			<ToastContainer />
			<CardHeader
				avatar={
					<Avatar
						sx={{ bgcolor: 'secondary.main' }}
						aria-label="Company-Email"
					>
						{email[0].toUpperCase()}
					</Avatar>
				}
				title={props.flag ? title : companyName}
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
					Starting from: {date}
				</Typography>
				<Typography variant="h6" color="text.secondary">
					Duration : {duration} days
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				{props.flag ? (
					<Button
						id={id}
						onClick={props.deletefunction}
						color="error"
						variant="contained"
					>
						Delete
					</Button>
				) : (
					<>
						<Button color="error" onClick={AddToFavourite}>
							Add To Favourites
							<FavoriteBorderOutlinedIcon color="error" />
						</Button>
						<Button onClick={()=>{props.handleDelete(id)}} >Remove from favourites</Button>
					</>
				)}

				{props.flag ? (
					<Button color="success" variant="contained" sx={{ ml: 1 }}>
						<Link
							style={{ textDecoration: 'none', color: 'white' }}
							to={{ pathname: 'updatetour', state: { id: id } }}
						>
							Update
						</Link>
					</Button>
				) : null}
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

					{props.flag ? null : <Typography>Contact Us</Typography>}
					{props.flag ? null : (
						<Stack direction="row" spacing={2} sx={{ mt: 1 }}>
							<a
								href={`https://wa.me/${whatsappNo}`}
								target="_blank"
							>
								<Chip color="success" icon={<WhatsAppIcon />} />
							</a>

							<a
								href={`https://www.instagram.com/${instaUsername}`}
								target="_blank"
							>
								<InstagramIcon />
							</a>
							<a href={url} target="_blank">
								<LinkIcon />
							</a>
						</Stack>
					)}
				</CardContent>
			</Collapse>
		</Card>
	);
}
