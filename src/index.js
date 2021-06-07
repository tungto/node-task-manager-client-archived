import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TaskProvider } from './context/task_context';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
