import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import '../styles/Signup.css';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Signup() {
	//import my custom hook
	const { Signup, verificationemail } = useAuth();
	// display error on the component
	const [error, setError] = useState('');
	//this helps me to avoid in creating multiple accounts
	const [loading, setLoading] = useState(false);

	// Defines the attributes for the user credentials
	const nameRef = useRef();
	const emailRef = useRef();
	const passRef = useRef();
	const confirmpassRef = useRef();
	const [gender, setGender] = useState('');

	//handles the changing value of gender
	const handleChange = e => {
		const { name, value } = e.target;
		setGender(value);
	};
	//handles my form submission
	const handleSubmit = async e => {
		e.preventDefault();
		if (passRef.current.value !== confirmpassRef.current.value) {
			return setError('Password doesnt match');
		}
		const obj = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			gender: gender,
			isOrg: 'No'
		};
		try {
			setError('');
			setLoading(true);
			const result = await Signup(
				emailRef.current.value,
				passRef.current.value
			).then(() => {
				axios.post('http://localhost:5000/users/new', obj).then(res => {
					console.log(res);
					verificationemail(emailRef.current.value).then(() => {
						nameRef.current.value = '';
						emailRef.current.value = '';
						passRef.current.value = '';
						confirmpassRef.current.value = '';

						setError('Check Your email for verification');
						alert('Account Created');
						setLoading(false);
					});
				});
			});
		} catch (error) {
			setError(error.message);
			console.log(error, 'Error');
		}
		setLoading(false);
	};
	return loading ? (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
				marginTop: '100px'
			}}
		>
			<ClipLoader color={'#CE0CA0'} loading={loading} size={100} />
			<h2 style={{ color: '#CE0CA0' }}>Loading</h2>
		</div>
	) : (
		<div className="parent">
			<div className="Signup-form">
				<h1>Sign up.</h1>
				<h4 style={{ color: 'red' }}>{error}</h4>
				<form onSubmit={handleSubmit} method="POST">
					<div>
						<label htmlFor="Name">Name</label>
						<br />
						<input
							type="text"
							name="Name"
							id="Name"
							ref={nameRef}
							placeholder="Enter your name"
							className="input-box"
						/>
					</div>
					<br />
					<div>
						<label htmlFor="email">Email</label>
						<br />
						<input
							type="email"
							name="email"
							id="email"
							ref={emailRef}
							placeholder="name@domain.com"
							className="input-box"
						/>
					</div>
					<br />
					<div>
						<label htmlFor="password">Password</label>
						<br />
						<input
							type="password"
							name="password"
							id="password"
							ref={passRef}
							minLength="8"
							placeholder="at least 8 characters"
							className="input-box"
						/>
					</div>
					<br />
					<div>
						<label htmlFor="confirm password">
							Confirm Password
						</label>
						<br />
						<input
							type="password"
							name="confirmpass"
							id="confirmpass"
							ref={confirmpassRef}
							placeholder="Confirm your Password"
							className="input-box"
						/>
					</div>
					<br />
					<div onChange={handleChange}>
						<label htmlFor="Gender">Gender</label>
						<br />
						<input
							type="radio"
							name="Gender"
							id="Gender"
							value="Male"
						/>{' '}
						Male
						<input
							type="radio"
							name="Gender"
							id="Gender"
							value="Female"
							style={{ marginLeft: '5px' }}
						/>{' '}
						Female
					</div>
					<br />
					<input
						type="submit"
						value="Signup"
						name="Signup"
						id="Signup"
						disabled={loading}
						className="Signup-Button"
					/>
					<p>
						Already have an account? <Link to="/">LogIn</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
