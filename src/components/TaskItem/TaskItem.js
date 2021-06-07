import React, { useState } from 'react';
import TaskForm from '../TaskForm/TaskForm';
import { useTaskContext } from '../../context/task_context';
import styled from 'styled-components';

const TaskItem = (task) => {
  const { removeTask, selectTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const { title, id, isSelected, dueDate } = task;

  return (
    <TaskItemContainer className='task-container'>
      <div className={`${isEditing ? 'task task-editing' : 'task'}`}>
        <div className='left-task-item'>
          <input
            type='checkbox'
            name='checkbox'
            className='checkbox'
            checked={isSelected}
            onChange={() => selectTask(id, isSelected)}
          />
          <span className='task-title'>{title}</span>
        </div>
        {/* <p className='task-title'>{dueDate.getMonth() + 1}</p> */}
        <div className='buttons'>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className='btn btn-detail'
          >
            detail
          </button>
          <button onClick={() => removeTask(id)} className='btn btn-remove'>
            remove
          </button>
        </div>
      </div>
      {isEditing && (
        <TaskForm
          task={task}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </TaskItemContainer>
  );
};

const TaskItemContainer = styled.div`
  border: 1px solid var(--clr-black);
  border-radius: var(--radius);
  // padding: 0.8rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  .task-editing {
    border-bottom: 1px solid var(--clr-black);
  }
  .task {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    .left-task-item {
      display: flex;
      align-items: center;
    }
    .checkbox[type='checkbox'] {
      display: inline-block;
      margin-right: 1rem;
      height: 16px;
      width: 16px;
    }
    .task-title {
      text-transform: capitalize;
    }
    .btn-detail {
      margin-right: 1rem;
    }
    .btn-remove {
      background-color: var(--clr-red-dark);
      :hover {
        background-color: var(--clr-red-light);
      }
    }
    .btn-detail {
      background-color: var(--clr-blue-dark);
      :hover {
        background-color: var(--clr-blue-light);
      }
    }
  }
`;

export default TaskItem;
