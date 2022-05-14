import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { UserContext } from '../../contexts/UserContext';
import TourContainer from "../TourContainer";
import MyLoader from '../MyLoader';
export default function Dashboard() {
	const { currentUser } = useAuth();
  const [tours,setTours]=useState([])
  const [loading,setLoading]=useState(true);
	const { userData, setUserData } = useContext(UserContext);

	let email = localStorage.getItem('email');
	useEffect(() => {
		console.log(email);
		console.log('Hi im useffect');
		const fetchData = async () => {
			try {
				Promise.all([
					axios.get(
						`http://localhost:5000/users/getuserdata/${email}`
					),
					axios.get('http://localhost:5000/users/getalltours')
				])
					.then(res => {
						setUserData(res[0].data);
						localStorage.setItem('Name', res[0].data.name);
            console.log(res[1].data)
            setLoading(false);
            setTours([...tours,...res[1].data])
					})
					.catch(err => {
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);
	return <>
 {loading?<div style={{display:'flex',justifyContent:'center',height:'100vh'}}>
   <MyLoader
						style={{
							justifyContent: 'center',
							alignItems: 'center'
						}}
						id={2}
					/>
 </div>:    <div style={{display:'flex',flexWrap:'wrap',marginLeft:'auto',marginRight:'auto',alignItems:'center',justifyContent:'center'}}>
        {tours.map(tour=>{
        return <TourContainer
							  flag={false}
								tour={tour}
                key={tour.id}
							/>
      })}
     </div>}

  </>;
}
