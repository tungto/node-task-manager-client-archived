import React, { Fragment, useContext } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { AuthContext } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';

function Auth({ authRoute }) {
	const {
		authState: { authLoading, isAuthenticated },
	} = useContext(AuthContext);

	let body;

	console.log(isAuthenticated);

	if (authLoading) {
		body = <h1>Loading</h1>;
	} else if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	} else {
		body = (
			<>
				{authRoute === 'login' && <LoginForm />}
				{authRoute === 'register' && <RegisterForm />}
			</>
		);
	}

	return (
		<div className="landing">
			<div className="landing-inner">
				<h1>Todo App</h1>
				<h4>Keep track of your activities</h4>
				{body}
			</div>
		</div>
	);
}

export default Auth;
