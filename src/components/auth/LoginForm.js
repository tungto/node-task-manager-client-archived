import { Form, Formik } from 'formik';
import React, { useState, useContext } from 'react';
import MyTextInput from '../UI/MyTextInput/MyTextInput';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AlertMessage from '../UI/AlertMessage/AlertMessage';

function LoginForm() {
	// Context
	const { loginUser } = useContext(AuthContext);
	const [alertMessage, setAlertMessage] = useState('');

	const history = useHistory();

	// Login
	const login = async (values) => {
		try {
			const loginData = await loginUser(values);

			if (loginData.success) {
			} else {
				console.log(loginData.message);
				setAlertMessage(loginData.message);
				setTimeout(() => setAlertMessage(null), 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			{alertMessage && <AlertMessage message={alertMessage} />}
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={Yup.object({
					email: Yup.string().email().required('Email is Required'),
					password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
				})}
				onSubmit={(values, { setSubmitting }) => {
					login(values);
					setSubmitting(false);
				}}>
				<Form>
					<MyTextInput label="User name" name="email" type="text" placeholder="Username" />
					<MyTextInput label="Password" name="password" type="password" placeholder="Password" />
					<button type="submit">Login</button>
				</Form>
			</Formik>

			<p>
				Don't have an account?
				<Link to="/register">
					<button>Register</button>
				</Link>
			</p>
		</>
	);
}

export default LoginForm;
