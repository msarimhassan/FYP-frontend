// import React,{useRef,useState} from 'react'
// import "../styles/CompanySignup.css";
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import ClipLoader from "react-spinners/ClipLoader";

// export default function CompanySignup() {

//   const { Signup,verificationemail }=useAuth();
//    const[creating,setCreating]=useState(false);
//     const [error,setError]=useState('');
//     const CompanyNameRef=useRef();
//     const EmailRef=useRef();
//     const DtsNoRef=useRef();
//     const PasswordRef=useRef();
//     const UrlRef=useRef();
//     const InstaRef=useRef();
//     const WhatsappRef=useRef();

//       const handleSubmit=async(e)=>{
//         e.preventDefault();
//         const obj={
//             "name":CompanyNameRef.current.value,
//             "email":EmailRef.current.value,
//             "DtsNo":DtsNoRef.current.value,
//             "url":UrlRef.current.value,
//             "instaUsername":InstaRef.current.value,
//             "whatsappNo":WhatsappRef.current.value,
//             "isOrg":"Yes"
//         }
//         let isVerified='';
//             setCreating(true);
//            const result= await axios.get(`https://tousirmapi.herokuapp.com/getcompany/${CompanyNameRef.current.value}/${DtsNoRef.current.value}`)
//            .then(res=>{
//              isVerified=res.data
//            })
//           if(isVerified==false)
//           {
//             setCreating(false);
//             return setError('You are not verified');
//           }

//           try {

//             setCreating(true);
//             setError('');
//             await Signup(EmailRef.current.value,PasswordRef.current.value).then(()=>{
//               axios.post('http://localhost:5000/company/new',obj).then((res)=>{
//                 console.log(res);
//                 verificationemail(EmailRef.current.value).then(()=>{
//                   CompanyNameRef.current.value='';
//                   EmailRef.current.value='';
//                   DtsNoRef.current.value='';
//                   PasswordRef.current.value='';
//                   UrlRef.current.value='';
//                   InstaRef.current.value='';
//                   WhatsappRef.current.value='';
//                 setError("Check Your email for verification");
//                alert("Account Created")
//                 })
//               })
//             })
//           }

//           catch (error) {
//             setError(error.message);
//           }
//           setCreating(false);
//         }
//     return (
//       creating ? <div style={{display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",marginTop:"100px"}}>
//      <ClipLoader color={'#CE0CA0'} loading={creating}  size={100} />
//      <h2 style={{color:"#CE0CA0"}}>Loading</h2>
//      </div>:  <div className='parent'>
//           <div className='company-signup-form'>
//                 <h1>Company Signup</h1>
//                  <h4 style={{color:"red"}}>{error}</h4>
//             <form onSubmit={handleSubmit} method='POST'>
//                 <div>
//                  <label htmlFor="Company Name">Company Name</label>
//                 <br />
//                 <input type="text" name="CompanyName" id="CompanyName" ref={CompanyNameRef} placeholder='Your Company Name' className='input-box' required/>
//                 </div>
//                 <br />
//                <div>
//                     <label htmlFor="Email">Email</label>
//                 <br />
//                 <input type="email" name="CompanyEmail" id="CompanyEmail" placeholder='Your E-mail' ref={EmailRef} className='input-box' required/>
//                </div>
//                 <br />
//                <div>
//                     <label htmlFor="DTS-Number">DTS-No</label>
//                 <br />
//                 <input type="text" name="DtsNo" id="DtsNo" ref={DtsNoRef} placeholder='Enter Your DTS-No' className='input-box' required/>
//                </div>
//                 <br />
//                 <div>
//                     <label htmlFor="Password">Password</label>
//                 <br />
//                 <input type="Password" name="Password" id="Password" ref={PasswordRef} placeholder='at least 8 characters' minLength="8"  className='input-box' required/>
//                  </div>
//                 <br />
//                <div>
//                 <label htmlFor="URL">Website-URL</label>
//                 <br />
//                 <input type="text" name="URL" id="URL" ref={UrlRef} placeholder='Your website URL' className='input-box'/>
//                </div>
//                 <br />
//                <div>
//                  <label htmlFor="Instagram">Instagram Username</label>
//                 <br />
//                 <input type="text" name="InstagramName" id="InstagramName" ref={InstaRef} placeholder='Your Insta Username' className='input-box' />
//               </div>
//                 <br />
//                 <div>
//                     <label htmlFor="Whatsapp Number">Whatsapp Number</label>
//                 <br />
//                 <input type="tel" name="Whatsapp" id="Whatsapp"  ref={WhatsappRef} pattern="[0-9]{11}" placeholder='Your Whatsapp No'className='input-box' />
//                  </div>
//                 <br />
//                 <input type="submit" name="submit" id="submit" className='Submit-Button' disabled={creating} />
//                 <br />
//                 <p>Already have an account? <Link to='/'>LogIn</Link></p>

//             </form>

//           </div>
//         </div>
//     )
// }

import React, { useState } from 'react';
import { useAuth } from '.././contexts/AuthContext';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import Navbar from './Navbar';

export default function CompanySignup() {
	const [error, setError] = useState({
		status: false,
		msg: '',
		type: ''
	});
	const { Signup, verificationemail } = useAuth();
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm();
	const onSubmit = async data => {
		setError({ status: false, msg: '', type: '' });
		let isVerified = null;
		setLoading(true);
		const result = await axios
			.get(
				`https://tousirmapi.herokuapp.com/getcompany/${data.CompanyName}/${data.DtsNo}`
			)
			.then(res => {
				isVerified = res.data;
				console.log(isVerified);
			});
		if (isVerified == false) {
			setLoading(false);
			setError({
				status: true,
				msg: 'Not a verified company',
				type: 'error'
			});
			return;
		}

		// if the company is verified then we can create a new account
		else if (isVerified == true) {
			try {
				await Signup(data.CompanyEmail, data.Password).then(() => {
					axios
						.post('http://localhost:5000/company/new', data)
						.then(res => {
							console.log(res);
							verificationemail(data.CompanyEmail).then(() => {
								document
									.getElementById('CompanySignup')
									.reset();
								setError({
									status: true,
									msg: 'Account Create check your email for verification',
									type: 'success'
								});
							});
						});
				});
			} catch (err) {
				const { Error } = err;
				console.log(Error);
				setError({ status: true, msg: err.message, type: 'error' });
			}
		}

		setLoading(false);
	};

	return (
		<React.Fragment>
			<Navbar />
			<Box
				component="form"
				textAlign="center"
				id="CompanySignup"
				onSubmit={handleSubmit(onSubmit)}
				sx={{
					border: 0,
					width: '50%',
					ml: 'auto',
					mr: 'auto',
					boxShadow: 3,
					borderRadius: 4,
					pb: 5,
					pl: 5,
					pr: 5,
					mt: 5,
					mb: 5,
					bgcolor: '#fff'
				}}
			>
				<Typography
					variant="h4"
					fontWeight="bolder"
					textAlign="left"
					sx={{ pt: 4 }}
				>
					Company Signup
				</Typography>
				{error.status ? (
					<Alert
						sx={{ mt: 1 }}
						variant="outlined"
						severity={error.type}
					>
						{error.msg}
					</Alert>
				) : (
					''
				)}
				<TextField
					fullWidth
					error={errors.CompanyName}
					id="outlined-basic"
					label="Company Name"
					variant="outlined"
					color="secondary"
					{...register('CompanyName', { required: true })}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.CompanyName && (
					<span style={{ color: 'red' }}>This field is required</span>
				)}
				<br />
				<TextField
					fullWidth
					error={errors.CompanyEmail}
					id="outlined-basic"
					label="Company Email"
					variant="outlined"
					color="secondary"
					{...register('CompanyEmail', {
						required: true,
						pattern:
							/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
					})}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.CompanyEmail && (
					<span style={{ color: 'red' }}>Enter a valid Email</span>
				)}
				<br />
				<TextField
					fullWidth
					error={errors.DtsNo}
					id="outlined-basic"
					label="DTS No"
					variant="outlined"
					color="secondary"
					{...register('DtsNo', { required: true })}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.DtsNo && (
					<span style={{ color: 'red' }}>This field is required</span>
				)}
				<br />

				<TextField
					fullWidth
					error={errors.Password}
					id="outlined-basic"
					label="Password"
					variant="outlined"
					color="secondary"
					{...register('Password', { required: true, min: 8 })}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.CompanyName && (
					<span style={{ color: 'red' }}>
						Password must be 8 characters
					</span>
				)}
				<br />
				<TextField
					fullWidth
					error={errors.Url}
					id="outlined-basic"
					label="Website URL"
					variant="outlined"
					color="secondary"
					{...register('Url', { required: true })}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.Url && (
					<span style={{ color: 'red' }}>This field is required</span>
				)}
				<br />
				<TextField
					fullWidth
					error={errors.WhatsappNo}
					id="outlined-basic"
					label="Whatsapp Number"
					variant="outlined"
					color="secondary"
					{...register('WhatsappNo', { required: true })}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.WhatsappNo && (
					<span style={{ color: 'red' }}>This field is required</span>
				)}
				<br />
				<TextField
					fullWidth
					error={errors.InstaName}
					id="outlined-basic"
					label="Instagram UserName"
					variant="outlined"
					color="secondary"
					{...register('InstaName', { required: true })}
					sx={{ mt: 3 }}
				/>
				<br />
				{errors.InstaName && (
					<span style={{ color: 'red' }}>This field is required</span>
				)}
				<br />
				<LoadingButton
					fullWidth
					type="submit"
					loading={loading}
					variant="contained"
					color="secondary"
					sx={{ mt: 3 }}
				>
					Signup
				</LoadingButton>
			</Box>
		</React.Fragment>
	);
}
