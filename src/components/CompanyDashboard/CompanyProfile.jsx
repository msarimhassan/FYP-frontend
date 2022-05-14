import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import KeyIcon from '@mui/icons-material/Key';
import InstagramIcon from '@mui/icons-material/Instagram';
import Popup from 'reactjs-popup';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkIcon from '@mui/icons-material/Link';
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
	const { ChangePassword } = useAuth();
	const email = localStorage.getItem('email');
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const {
		register: register2,
		handleSubmit: handleSubmit2,
		formState: { errors: errors2 }
	} = useForm();
	const {
		register: register3,
		handleSubmit: handleSubmit3,
		formState: { errors: errors3 }
	} = useForm();
	const {
		register: register4,
		handleSubmit: handleSubmit4,
		formState: { errors: errors4 }
	} = useForm();
	const onSubmit = async data => {
		console.log(data);
		const key = Object.keys(data)[0];
		switch (key) {
			case 'password':
				setLoading(true);
				ChangePassword(data.password)
					.then(() => {
						setLoading(false);
					})
					.catch(err => {
						console.log(err);
					});
				setLoading(false);
				break;

			case 'insta':
				setLoading(true);
				axios
					.put(
						`http://localhost:5000/company/updatecompanyinsta/${email}`,
						data
					)
					.then(res => {
						toast.success('InstaUsername Updated', {
							position: toast.POSITION.TOP_CENTER
						});
						document.getElementById('instausername').reset();
						setLoading(false);
					})
					.catch(err => {
						console.log(err);
						setLoading(false);
					});
				break;
			case 'whatsapp':
				setLoading(true);
				axios
					.put(
						`http://localhost:5000/company/updatecompanywhatsapp/${email}`,
						data
					)
					.then(res => {
						toast.success('WhatsappNo Updated', {
							position: toast.POSITION.TOP_CENTER
						});
						document.getElementById('whatsapp').reset();
						setLoading(false);
					})
					.catch(err => {
						console.log(err);
						setLoading(false);
					});
				break;
			case 'url':
				setLoading(true);
				axios
					.put(
						`http://localhost:5000/company/updatecompanywebsite/${email}`,
						data
					)
					.then(res => {
						toast.success('Website Url Updated', {
							position: toast.POSITION.TOP_CENTER
						});
						document.getElementById('url').reset();
						setLoading(false);
					})
					.catch(err => {
						console.log(err);
						setLoading(false);
					});
				break;
		}
	};
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
				{/* Password Component */}
				<ListItemButton>
					<ListItemIcon>
						<KeyIcon />
					</ListItemIcon>
					<ListItemText primary="Password" />

					<Popup trigger={<EditIcon />} modal>
						<Box
							sx={{ textAlign: 'center', pt: 2 }}
							component="form"
						>
							<Typography
								variant="h6"
								sx={{ fontWeight: 'bolder' }}
							>
								Change Password
							</Typography>
							<TextField
								sx={{ mt: 2 }}
								id="password"
								color="secondary"
								label="New Password"
								variant="filled"
								error={errors.password}
								{...register('password', { required: true })}
							/>
							<br />
							<LoadingButton
								onClick={handleSubmit(onSubmit)}
								type="submit"
								variant="contained"
								color="secondary"
								loading={loading}
								sx={{ mt: 3 }}
							>
								Change
							</LoadingButton>
						</Box>
					</Popup>
				</ListItemButton>

				{/* Instagram Component */}
				<ListItemButton>
					<ListItemIcon>
						<InstagramIcon />
					</ListItemIcon>
					<ListItemText primary="Instagram" />
					<Popup trigger={<EditIcon />} modal>
						<Box
							sx={{ textAlign: 'center', pt: 2 }}
							component="form"
							id="instausername"
						>
							<Typography
								variant="h6"
								sx={{ fontWeight: 'bolder' }}
							>
								Change Insta Username
							</Typography>
							<TextField
								sx={{ mt: 2 }}
								id="instagram"
								color="secondary"
								label="New UserName"
								variant="filled"
								error={errors2.insta}
								{...register2('insta', { required: true })}
							/>
							<br />
							<LoadingButton
								onClick={handleSubmit2(onSubmit)}
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
				{/* Whatsapp Component */}
				<ListItemButton>
					<ListItemIcon>
						<WhatsAppIcon />
					</ListItemIcon>
					<ListItemText primary="Whatsapp" />
					<Popup trigger={<EditIcon />} modal>
						<Box
							sx={{ textAlign: 'center', pt: 2 }}
							component="form"
							id="whatsapp"
						>
							<Typography
								variant="h6"
								sx={{ fontWeight: 'bolder' }}
							>
								Change Whatsapp Number
							</Typography>
							<TextField
								sx={{ mt: 2 }}
								id="whatsapp"
								color="secondary"
								label="New Number"
								variant="filled"
								error={errors3.whatsapp}
								{...register3('whatsapp', { required: true })}
							/>
							<br />
							<LoadingButton
								onClick={handleSubmit3(onSubmit)}
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

				{/* Website Component */}
				<ListItemButton>
					<ListItemIcon>
						<LinkIcon />
					</ListItemIcon>
					<ListItemText primary="Website Url" />
					<Popup trigger={<EditIcon />} modal>
						<Box
							sx={{ textAlign: 'center', pt: 2 }}
							component="form"
							id="url"
						>
							<Typography
								variant="h6"
								sx={{ fontWeight: 'bolder' }}
							>
								Change Website Url
							</Typography>
							<TextField
								sx={{ mt: 2 }}
								id="url"
								color="secondary"
								label="New url"
								variant="filled"
								error={errors4.url}
								{...register4('url', { required: true })}
							/>
							<br />
							<LoadingButton
								onClick={handleSubmit4(onSubmit)}
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
