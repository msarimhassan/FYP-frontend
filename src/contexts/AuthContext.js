import React, { useContext, useState, useEffect } from 'react';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
	signOut
} from 'firebase/auth';
import { auth } from '../firebase.js';
import { useHistory } from 'react-router-dom';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentuser] = useState('');
	const navigate = useHistory();

	//Signup function
	function Signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	//Login function

	function Login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	//password reset function
	function sendEmail(email) {
		return sendPasswordResetEmail(auth, email);
	}

	function verificationemail(email) {
		return sendEmailVerification(auth.currentUser);
	}
	//Logout function
	function Logout() {
		signOut(auth)
			.then(() => {
				navigate.push('/');
			})
			.catch(error => {
				console.log(error);
			});
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setCurrentuser(user);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		Signup,
		Logout,
		Login,
		sendEmail,
		verificationemail
	};
	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
