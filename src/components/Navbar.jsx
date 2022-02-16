import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import Logo from '../images/logo.png';

export default function Navbar() {
	const navigate = useHistory();
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" color="secondary">
				<Toolbar sx={{ height: 32 }}>
					{/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
					<Box component="div" sx={{ flexGrow: 1, mt: 1 }}>
						<img src={Logo} alt="" width="120px" />
					</Box>
					<Button
						color="inherit"
						onClick={() => {
							navigate.push('/');
						}}
					>
						Login
					</Button>
					<Button
						color="inherit"
						onClick={() => {
							navigate.push('/companysignup');
						}}
					>
						Company Signup
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
