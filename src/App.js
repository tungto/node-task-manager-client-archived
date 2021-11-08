import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/routing/ProtectedRoute';
import AuthContextProvider from './context/AuthContext';
import AddTaskItemPage from './pages/AddTaskItemPage';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import Auth from './views/Auth';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Route path="/" component={() => <HomePage />} exact={true} />

				<ProtectedRoute path="/add" exact component={({ match, history }) => <AddTaskItemPage match={match} history={history} />} />

				<Route exact path="/login" render={(props) => <Auth {...props} authRoute="login" />} />
				<Route exact path="/register" render={(props) => <Auth {...props} authRoute="register" />} />

				<ProtectedRoute exact path="/dashboard" component={Dashboard} />
			</BrowserRouter>
		</div>
	);
}

export default App;
