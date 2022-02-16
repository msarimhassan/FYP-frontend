import React from 'react';
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

function App() {
	return (
		<React.Fragment>
			<AuthProvider>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/signup" component={Signup} />
					<Route
						exact
						path="/forgetpassword"
						component={Forgetpassword}
					/>
					<Route
						exact
						path="/companysignup"
						component={CompanySignup}
					/>
					<Route exact path="/admin" component={Admin} />
					<Route exact path="/user" component={User} />

					<Route path="/company" component={CompanyDashboard} />
				</Switch>
			</AuthProvider>
		</React.Fragment>
	);
}

export default App;
