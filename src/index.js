import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TaskContextProvider from './context/TaskContext';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './context/AuthContext';

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<TaskContextProvider>
				<App />
			</TaskContextProvider>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
