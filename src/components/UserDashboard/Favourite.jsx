import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyLoader from '../MyLoader';
import TourContainer from '../TourContainer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Favourite() {
	const [loading, setLoading] = useState(true);
	const [tours, setTours] = useState([]);
	const email = localStorage.getItem('email');

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			axios
				.get(`http://localhost:5000/users/getfavourite/${email}`)
				.then(res => {
					console.log(res);
					setTours([...tours, ...res.data]);
					setLoading(false);
				})
				.catch(err => {
					console.log(err);
				});
		};
		fetchData();
	}, []);
	// const RemoveFavourite = (id) => {

	// 	console.log('remove id',id);
	// 	// try {
	// 	// 	axios
	// 	// 		.delete(`http://localhost:5000/users/deletefavourite/${id}`)
	// 	// 		.then(res => {
	// 	// 			console.log(res);
	// 	// 		});
	// 	// } catch (error) {
	// 	// 	console.log(error);
	// 	// }
	// };
  const handleDelete = (id) => {
	  try {
		   axios
				.delete(`http://localhost:5000/users/deletefavourite/${id}`)
				.then(res => {
					console.log(res);
					toast.success('Deleted from Favourites', {
						position: toast.POSITION.TOP_CENTER
					});
				});
	  } catch (error) {
		  console.log(error);
	  }
	  const newarray= tours.filter((item)=>{
		 return  item.id != id
	  })

	  setTours(newarray);
	 
  }
	return (
		<>
			<ToastContainer />
			{loading ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						height: '100vh'
					}}
				>
					<MyLoader
						style={{
							justifyContent: 'center',
							alignItems: 'center'
						}}
						id={2}
					/>
				</div>
			) : (
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						marginLeft: 'auto',
						marginRight: 'auto',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					{tours.map(tour => {
						return (
							<TourContainer
								flag={false}
								tour={tour}
								key={tour.id}
								handleDelete={handleDelete}
							/>
						);
					})}
				</div>
			)}
		</>
	);
}
