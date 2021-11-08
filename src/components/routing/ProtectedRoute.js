import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function ProtectedRoute({ component: Component, ...rest }) {
	const {
		authState: { authLoading, isAuthenticated },
	} = useContext(AuthContext);

	if (authLoading) {
		return (
			<div className="spinner-container">
				<h1>Loading.....</h1>
			</div>
		);
	}
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					<>
						<Component {...rest} {...props} />
					</>
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
}

export default ProtectedRoute;
