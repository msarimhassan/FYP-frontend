import React from 'react';
import { Link } from 'react-router-dom';
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
	return (
		<div>
			<ul>
				<li>{id}</li>
				<li>{email}</li>
				<li>{title}</li>
				<li>{location}</li>
				<li>{price}</li>
				<li>{duration}</li>
				<img src={imgUrl} alt="" style={{ height: '200px' }} />
				<li>{date}</li>
				<li>{details}</li>
			</ul>
			<button id={id} onClick={props.deletefunction}>
				delete
			</button>
			<Link to={{ pathname: 'updatetour', state: { id: id } }}>
				Update
			</Link>
		</div>
	);
}
