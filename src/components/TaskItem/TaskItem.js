import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { TaskContext } from '../../context/TaskContext';
import TaskForm from '../TaskForm/TaskForm';

const TaskItem = (props) => {
	const { removeTask, selectTask } = useContext(TaskContext);
	const [isEditing, setIsEditing] = useState(false);
	const { name, _id, isSelected } = props;

	return (
		<TaskItemContainer className="task-container">
			<div className={`${isEditing ? 'task task-editing' : 'task'}`}>
				<div className="left-task-item">
					<input type="checkbox" name="checkbox" className="checkbox" checked={isSelected} onChange={() => selectTask(_id, isSelected)} />
					<span className="task-title">{name}</span>
				</div>
				<div className="buttons">
					<button onClick={() => setIsEditing(!isEditing)} className="btn btn-detail">
						detail
					</button>
					<button onClick={() => removeTask(_id)} className="btn btn-remove">
						remove
					</button>
				</div>
			</div>
			{isEditing && <TaskForm task={props} isEditing={isEditing} setIsEditing={setIsEditing} />}
		</TaskItemContainer>
	);
};

const TaskItemContainer = styled.div`
	border: 1px solid var(--clr-black);
	border-radius: var(--radius);
	margin-top: 1.5rem;
	margin-bottom: 1.5rem;
	.task-editing {
		border-bottom: 1px solid var(--clr-black);
	}
	.task {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		@media (max-width: 500px) {
			padding: 0.5rem;
			flex-direction: column;
			.left-task-item {
				margin-bottom: 1rem;
			}
		}
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
