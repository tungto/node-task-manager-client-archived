import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import MyTextInput from '../UI/MyTextInput/MyTextInput';
import { AuthContext } from '../../context/AuthContext';
import AlertMessage from '../UI/AlertMessage/AlertMessage';

function RegisterForm() {
	const { registerUser } = useContext(AuthContext);
	const [alertMessage, setAlertMessage] = useState('');

	const register = async (values) => {
		try {
			const registerData = await registerUser(values);
			console.log(registerData);
			if (!registerData.success) {
				setAlertMessage(registerData.message);
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
					name: '',
					email: '',
					password: '',
					confirmPassword: '',
				}}
				validationSchema={Yup.object({
					name: Yup.string().required('Name is Required'),
					email: Yup.string().email().required('Email is Required'),
					password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
					confirmPassword: Yup.string().when('password', {
						is: (val) => (val && val.length > 0 ? true : false),
						then: Yup.string().oneOf([Yup.ref('password')], 'Both password need to be the same'),
					}),
				})}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						register(values);
						setSubmitting(false);
					}, 400);
				}}>
				<Form>
					<MyTextInput label="Name" name="name" type="text" placeholder="Name" />
					<MyTextInput label="Email" name="email" type="text" placeholder="Email" />
					<MyTextInput label="Password" name="password" type="password" placeholder="Password" />
					<MyTextInput label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm Password" />
					<button type="submit">Register</button>
				</Form>
			</Formik>
			<p>
				Already have an account?
				<Link to="/login">
					<button>Login</button>
				</Link>
			</p>
		</>
	);
}

export default RegisterForm;
