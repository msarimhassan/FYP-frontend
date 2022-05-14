// User Dashboard app bar

import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
import { useAuth } from '../../contexts/AuthContext';
import { CardHeader } from '@mui/material';
import { UserContext } from '../../contexts/UserContext';

const ResponsiveAppBar = props => {
	const linkStyle = {
		textDecoration: 'none'
	};
	const pathname = props.pathname;
	const { userData } = useContext(UserContext);
	const { currentUser, Logout } = useAuth();

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static" color="secondary">
			<Container maxWidth="xl">
				<Toolbar disableGutters sx={{ height: 40 }}>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							mr: 2,
							mt: 1,
							display: { xs: 'none', md: 'flex' }
						}}
					>
						<img src={Logo} alt="TrekXplorer" width="120px" />
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' }
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' }
							}}
						>
							{/*Nav menu  */}

							<Link
								to={`${pathname}/dashboard`}
								style={linkStyle}
							>
								<MenuItem
									key="Dashboard"
									onClick={handleCloseNavMenu}
								>
									<Typography textAlign="center">
										Dashboard
									</Typography>
								</MenuItem>
							</Link>

							<Link
								to={`${pathname}/favourite`}
								style={linkStyle}
							>
								<MenuItem
									key="favourite"
									onClick={handleCloseNavMenu}
								>
									<Typography textAlign="center">
										Favourites
									</Typography>
								</MenuItem>
							</Link>
						</Menu>
					</Box>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' }
						}}
					>
						<img src={Logo} alt="TrekXplorer" width="120px" />
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' }
						}}
					>
						{/* NAVBAR */}
						<Link to={`${pathname}/dashboard`} style={linkStyle}>
							<Button
								key="Dashboard"
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								Dashboard
							</Button>
						</Link>
						<Link to={`${pathname}/favourite`} style={linkStyle}>
							<Button
								key="favourite"
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								Favourites
							</Button>
						</Link>
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Profile">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0, m: 0, color: '#fff' }}
							>
								<CardHeader
									avatar={
										<Avatar>
											{/* {localStorage&&
												localStorage.getItem('Name')[0].toUpperCase()
												} */}
										</Avatar>
									}
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem
								key="Company Profile"
								onClick={handleCloseUserMenu}
							>
								<Link
									style={{
										textDecoration: 'none',
										color: 'black'
									}}
									to={`${pathname}/companyprofile`}
								>
									Profile
								</Link>
							</MenuItem>
							<MenuItem
								key="Logout"
								onClick={handleCloseUserMenu}
							>
								<Typography
									textAlign="center"
									onClick={() => Logout()}
								>
									Logout
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
