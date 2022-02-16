import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';
import '../styles/Login.css';

export default function Login() {
	const [loading, setLoading] = useState(false);
	const emailRef = useRef();
	const passwordRef = useRef();
	let history = useHistory();
	const { Login } = useAuth();
	const [error, setError] = useState();

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await Login(emailRef.current.value, passwordRef.current.value).then(
				res => {
					if (res.user.emailVerified === true) {
						axios
							.get(
								`http://localhost:5000/users/findbyemail/${emailRef.current.value}`
							)
							.then(res => {
								const { isOrg } = res.data;
								if (isOrg === 'No') {
									history.push('/user');
								} else if (isOrg === 'Yes') {
									history.push('/company');
								}
							});
					} else {
						setLoading(false);
						setError('Please verify your email');
						emailRef.current.value = '';
						passwordRef.current.value = '';
					}
				}
			);
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
		setLoading(false);
	};

	return (
		<React.Fragment>
			<Navbar />
			<div className="parent">
				<div className="Login-form" style={{ marginTop: '50px' }}>
					<div style={{ marginLeft: '22px' }}>
						<h1>Log in.</h1>
						<p
							style={{
								color: 'rgba(112,112,112,0.5)',
								fontWeight: 'bolder'
							}}
						>
							Login with your data that you entered during your
							registration
						</p>
						<h4 style={{ color: 'red' }}>{error}</h4>
					</div>
					<form
						method="POST"
						onSubmit={handleSubmit}
						style={{ marginTop: '8px' }}
					>
						<div>
							<label htmlFor="email">Your e-mail</label>
							<br />
							<input
								type="email"
								name="email"
								id="email"
								ref={emailRef}
								placeholder="Enter your email"
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
								ref={passwordRef}
								placeholder="Enter your password"
								className="input-box"
							/>
						</div>
						<br />
						<input
							type="submit"
							value="Login"
							name="Login"
							id="Login"
							className="Login-Button"
							disabled={loading}
						/>
						<br />
						<Link
							style={{ marginLeft: '52px' }}
							to="/forgetpassword"
						>
							Forgot Password?
						</Link>
						<p style={{ marginLeft: '10px' }}>
							Dont have an account{' '}
							<Link to="/signup">Signup</Link>
						</p>
					</form>
				</div>
			</div>
		</React.Fragment>
	);
}
