import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import TourContainer from '../TourContainer';
import Box from "@mui/material/Box";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { storage } from "../../firebase";
import { ref,deleteObject } from 'firebase/storage';


export default function ManageTours() {
	const { currentUser } = useAuth();
	const [tours, setTours] = useState([]);
	const [open, setOpen] = React.useState(false);
	useEffect(() => {
		fetchData();
	}, tours);

	const fetchData = async () => {
		axios
			.get(`http://localhost:5000/company/gettours/${currentUser.email}`)
			.then(res => {
				const data = res.data;
				setTours([...tours, ...data]);
			});
	};

	const handleDelete = e => {
		const id = e.target.id;
		let deletedUrl=null;
		console.log(e.target.id);

		for (let i=0;i<tours.length;i++)
		{
			if (tours[i].id===id)
			{
               deletedUrl = tours[i].imgUrl;
			}
		}
		if(deletedUrl!=='')
		{
          const imgRef = ref(storage,deletedUrl);
         
		console.log(imgRef);
		deleteObject(imgRef).then(() => {
            axios
			.delete(`http://localhost:5000/company/deletetour/${id}`)
			.then(res => {
				console.log(res.data);
				setOpen(true);
				setTours(
			tours.filter(tour => {
				return tour.id !== id;
			})
		);
		alert('Deleted');
			})
		})
		}
		else{
              axios
			.delete(`http://localhost:5000/company/deletetour/${id}`).then(res=>{
				console.log(res.data);
				setOpen(true);
				setTours(
			  tours.filter(tour => {
				return tour.id !== id;
			})
		   );
		alert('Deleted');
			})
		}
	
		
	};

	return (
		<React.Fragment>
         <Box sx={{ maxWidth:450,m:'auto',bgcolor: 'text.primary'}}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="success"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Deleted
        </Alert>
      </Collapse>
    </Box>

			{/* Tour Cards */}
		<Box sx={{maxWidth:450,m:'auto'}}>
			{tours.map(tour => (
				<TourContainer tour={tour} deletefunction={handleDelete} />
			))}
		</Box>
		</React.Fragment>
	);
}
