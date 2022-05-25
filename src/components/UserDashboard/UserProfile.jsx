import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Popup from 'reactjs-popup';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography, TextField } from '@mui/material';
import 'reactjs-popup/dist/index.css';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAuth } from '../../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function NestedList() {
	const [loading, setLoading] = useState(false);
	const email = localStorage.getItem('email');
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const onSubmit = async data => {
    try {
      setLoading(true);
      axios.put(`http://localhost:5000/users/updatename/${email}`,data).then(res=>{
      toast.success('Updated', {
			position: toast.POSITION.TOP_CENTER
		});
    setLoading(false);
      })
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
	return (
		<>
			<ToastContainer />
			<List
				sx={{
					width: '100%',
					maxWidth: 360,
					bgcolor: 'background.paper',
					ml: 'auto',
					mr: 'auto',
					mt: 6
				}}
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Profile
					</ListSubheader>
				}
			>
				<ListItemButton>
					<ListItemIcon><BadgeOutlinedIcon/></ListItemIcon>
					<ListItemText primary="Name" />

					<Popup trigger={<EditIcon />} modal>
						<Box
							sx={{ textAlign: 'center', pt: 2 }}
							component="form"
						>
							<Typography
								variant="h6"
								sx={{ fontWeight: 'bolder' }}
							>
								Change Name
							</Typography>
							<TextField
								sx={{ mt: 2 }}
								id="name"
								color="secondary"
								label="New Name"
								variant="filled"
								error={errors.name}
								{...register('name', { required: true })}
							/>
							<br />
							{errors.name && (
								<span style={{ color: 'red' }}>
									This field is required
								</span>
							)}
							<br />

							<LoadingButton
								loading={loading}
								onClick={handleSubmit(onSubmit)}
								type="submit"
								variant="contained"
								color="secondary"
								sx={{ mt: 3 }}
							>
								Change
							</LoadingButton>
						</Box>
					</Popup>
				</ListItemButton>
			</List>
		</>
	);
}
