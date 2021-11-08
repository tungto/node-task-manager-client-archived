import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { authReducer } from '../reducers/authReducer';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../utils/constants';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, { authLoading: true, isAuthenticated: false, user: null });

	// Authenticate User
	const loadUser = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
		}
		try {
			const response = await axios.get(`${apiUrl}`);

			if (response.data.success) {
				console.log(response.data.user);
				dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: true, user: response.data.user } });
			}
		} catch (error) {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
			setAuthToken(null);
			dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: false, user: null } });
		}
	};

	useEffect(() => {
		loadUser();
	}, []);

	// Login
	const loginUser = async (userForm) => {
		console.log(userForm, `${apiUrl}/users/login`);
		try {
			const response = await axios.post(`${apiUrl}/users/login`, userForm);
			console.log(userForm, `${apiUrl}/users/login`, response);
			if (response.data.success) {
				localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);
				await loadUser();
			}
			return response.data;
		} catch (error) {
			console.log(error);
			if (error.response.data) {
				return error.response.data;
			} else {
				return { success: false, message: error.message };
			}
		}
	};

	// Register
	const registerUser = async (userForm) => {
		console.log(userForm);
		try {
			const response = await axios.post(`${apiUrl}/users/register`, userForm);
			if (response.data.success) {
				localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);
			}
			await loadUser();
			return response.data;
		} catch (error) {
			if (error.response.data) {
				return error.response.data;
			} else {
				return { success: false, message: error.message };
			}
		}
	};

	// Logout
	const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
		dispatch({
			type: 'SET_AUTH',
			payload: { isAuthenticated: false, user: null },
		});
	};

	const authContextData = { loginUser, authState, registerUser, logoutUser };

	return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
