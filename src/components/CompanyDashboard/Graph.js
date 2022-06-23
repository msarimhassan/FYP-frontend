import React,{useEffect,useContext} from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip} from 'recharts';
import { CompanyContext } from '../../contexts/CompanyContext';

export default function Graph() {
     const email=localStorage.getItem('email');
	 	const {
			count,
			favCount,
			
		} = useContext(CompanyContext);
    useEffect(()=>{
      
     getTour();
       
	},[])

	const getTour=async()=>{
     const response=await axios.get(`http://localhost:5000/company/gettours/${email}`);
	 console.log(response.data);
	}

	const data01 = [
		{ name: 'Tour Counts', value:count? count:0 },
	
	];
	const data02 = [
		{ name: 'Add to Favourites', value:favCount?favCount:0 },]


	return (
		
			<PieChart width={200} height={250}>
				<Pie
					data={data01}
					dataKey="value"
					cx="50%"
					cy="50%"
					outerRadius={60}
					fill="#8884d8"
				/>
                <Tooltip/>
				<Pie
					data={data02}
					dataKey="value"
					cx="50%"
					cy="50%"
					innerRadius={70}
					outerRadius={90}
					fill="#82ca9d"
					label
				/>
			</PieChart>
		
	);
}
