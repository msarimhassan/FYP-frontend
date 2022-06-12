import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Forgetpassword from './components/Forgetpassword';
import CompanySignup from './components/CompanySignup';
import User from './components/User';
// import PrivateRoute from "./components/PrivateRoute";
import CompanyDashboard from './components/CompanyDashboard';
import Admin from './components/Admin';
import { AuthProvider } from './contexts/AuthContext';
import './styles/App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CompanyDataProvider } from './contexts/CompanyContext';
import { UserDataProvider } from './contexts/UserContext';
import PrivateRoute from './components/PrivateRoute';
import PrivateCompanyRoute from './components/PrivateCompanyRoute';

function App() {
	const theme = createTheme({
		typography: {
			fontFamily: ['Raleway', 'sans-serif'].join(',')
		}
	});
	// useEffect(()=>{
	// 	const messaging=app.messaging();
	// 	messaging.requestPermission().then(()=>{
	// 		return messaging.getToken();
	// 	}).then((token)=>{
	// 		console.log(token);
	// 	}).catch((err)=>{console.log(err)})
	// })
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<Switch>
						<Route exact path="/" component={Login} />
						<Route
							exact
							path="/forgetpassword"
							component={Forgetpassword}
						/>
						{/* userroute */}
						<PrivateRoute>
							<Route exact path="/signup" component={Signup} />
						</PrivateRoute>
						<Route
							exact
							path="/companysignup"
							component={CompanySignup}
						/>
						<Route exact path="/admin" component={Admin} />
						<UserDataProvider>
							<PrivateRoute>
								<Route path="/user" component={User} />
							</PrivateRoute>
							<CompanyDataProvider>
								<PrivateCompanyRoute>
									<Route
										path="/company"
										component={CompanyDashboard}
									/>
								</PrivateCompanyRoute>
							</CompanyDataProvider>
						</UserDataProvider>
					</Switch>
				</AuthProvider>
			</ThemeProvider>
		</React.Fragment>
	);
}

export default App;
