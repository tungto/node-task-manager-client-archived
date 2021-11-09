import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import MyTextInput from '../UI/MyTextInput/MyTextInput';
import { AuthContext } from '../../context/AuthContext';
import AlertMessage from '../UI/AlertMessage/AlertMessage';
import styled from 'styled-components';

function RegisterForm() {
	const { registerUser } = useContext(AuthContext);
	const [alertMessage, setAlertMessage] = useState('');

	const register = async (values) => {
		try {
			const registerData = await registerUser(values);
			if (!registerData.success) {
				setAlertMessage(registerData.message);
				setTimeout(() => setAlertMessage(null), 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Wrapper>
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
					password: Yup.string().min(6, 'Must be 6 characters or more').required('Password is Required'),
					confirmPassword: Yup.string()
						.when('password', {
							is: (val) => (val && val.length > 0 ? true : false),
							then: Yup.string().oneOf([Yup.ref('password')], 'Both password need to be the same'),
						})
						.required('Confirm Password is Required'),
				})}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						register(values);
						setSubmitting(false);
					}, 400);
				}}>
				<Form className="register-form">
					<MyTextInput label="Name" name="name" type="text" placeholder="Name" />
					<MyTextInput label="Email" name="email" type="text" placeholder="Email" />
					<MyTextInput label="Password" name="password" type="password" placeholder="Password" />
					<MyTextInput label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm Password" />
					<br />
					<button type="submit" className="btn btn-register">
						Register
					</button>
				</Form>
			</Formik>
			<br />
			<p>
				Already have an account?
				<Link to="/login">
					<button className="btn btn-login">Login</button>
				</Link>
			</p>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	.register-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		margin-top: 50px;
		input {
			border: 1px solid grey;
			padding: 5px 10px;
			margin: 10px;
			width: 400px;
			border-radius: 3px;
		}
		.error {
			font-size: 10px;
			color: red;
			text-align: left;
		}
		.btn-register {
			color: #fff;
			background-color: #007bff;
			border-color: #007bff;
		}
	}
	button.btn-login {
		color: #fff;
		background-color: #28a745;
		border-color: #28a745;
		margin-left: 10px;
	}
`;

export default RegisterForm;
