import React from 'react';
import Header from '../components/Header/Header';
import TaskForm from '../components/TaskForm/TaskForm';

const AddTaskItemPage = (props) => {
  return (
    <div className='add-task-container section-center'>
      <Header />
      <h3>New Task</h3>
      <TaskForm history={props.history} />
    </div>
  );
};

export default AddTaskItemPage;
