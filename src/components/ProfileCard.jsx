import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import { Typography, Stack } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { CompanyContext } from '../contexts/CompanyContext';

export default function ProfileCard() {
	const { companyData } = useContext(CompanyContext);
	return (
		<>
			<Avatar sx={{ width: 56, height: 56, bgcolor: ' #F6BA1E' }}>
				H
			</Avatar>
			<Typography sx={{ mt: 1 }}>Touring Company</Typography>
			<Typography sx={{ mt: 1 }} variant="h6">
				{companyData && companyData.name}
			</Typography>
			<Stack sx={{ mt: 1 }} direction="row" spacing={1}>
				<WhatsAppIcon />
				<InstagramIcon />
				<LanguageRoundedIcon />
			</Stack>
		</>
	);
}
