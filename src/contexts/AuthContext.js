import React, { useContext, useState, useEffect } from 'react';
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
	signOut,
	updatePassword
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
				localStorage.clear();

				navigate.push('/');
			})
			.catch(error => {
				console.log(error);
			});
	}

	//password change function

	function ChangePassword(password) {
		return updatePassword(auth.currentUser, password);
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
		verificationemail,
		ChangePassword
	};
	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
