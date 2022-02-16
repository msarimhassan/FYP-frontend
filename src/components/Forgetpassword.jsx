import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Forgetpassword.css';
import { useAuth } from '../contexts/AuthContext';
export default function Forgetpassword() {
	const emailRef = useRef();
	const [error, setError] = useState();
	const { sendEmail } = useAuth();
	const handleSubmit = async e => {
		e.preventDefault();
		const email = emailRef.current.value;
		try {
			await sendEmail(email);
			setError('Check your email');
		} catch (error) {
			setError(error.message);
		}
	};
	return (
		<div className="parent">
			<div className="Submit-form" style={{ marginTop: '50px' }}>
				<form onSubmit={handleSubmit}>
					<h1>Password Reset</h1>
					<h5 style={{ color: 'red' }}>{error}</h5>
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
					<input
						type="submit"
						name="submit"
						id="submit"
						className="Submit-Button"
					/>
					<br />
					<Link to="/" style={{ marginLeft: '94px' }}>
						Login
					</Link>
				</form>
			</div>
		</div>
	);
}
