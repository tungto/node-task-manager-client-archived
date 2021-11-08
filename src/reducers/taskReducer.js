import * as Types from '../actions';
import { findTaskIndex } from '../utils/helpers';

const taskReducer = (state, action) => {
	const { type, payload } = action;
	if (type === Types.POSTS_LOADED_SUCCESS) {
		return {
			...state,
			tasks: payload,
			taskLoading: false,
		};
	}
	if (type === Types.POSTS_LOADED_FAIL) {
		return {
			...state,
			tasks: [],
			taskLoading: false,
		};
	}

	if (type === Types.ADD_TASK) {
		return { ...state, tasks: [...state.tasks, payload] };
	}

	if (type === Types.DELETE_TASK) {
		const newTaskList = state.tasks.filter((task) => task._id !== payload);
		return { ...state, tasks: newTaskList };
	}

	if (type === Types.UPDATE_TASK) {
		console.log(payload);
		const updatedTaskIndex = findTaskIndex(state.tasks, payload);
		console.log(updatedTaskIndex);
		const updatedTaskList = [...state.tasks];
		updatedTaskList[updatedTaskIndex] = payload;
		return {
			...state,
			tasks: updatedTaskList,
		};
	}

	if (type === Types.SELECT_TASK) {
		let { selectedItems } = state;
		const updatedTaskList = state.tasks.map((task) => {
			if (task.id === payload) {
				selectedItems += !task.isSelected ? 1 : -1;
				return { ...task, isSelected: !task.isSelected };
			} else {
				return task;
			}
		});

		return {
			...state,
			tasks: updatedTaskList,
			selectedItems,
		};
	}

	if (type === Types.REMOVE_SELECTED_TASKS) {
		const updatedTaskList = state.tasks.filter((task) => !task.isSelected);
		return { ...state, tasks: updatedTaskList, selectedItems: 0 };
	}

	if (type === Types.UPDATE_FILTERS) {
		const { name, value } = payload;
		return { ...state, filters: { ...state.filters, [name]: value } };
	}

	if (type === Types.FILTER_TASKS) {
		const tempTasks = [...state.tasks];
		const { text } = state.filters;
		const searchResults = tempTasks.filter((task) => {
			return task.title.toLowerCase().startsWith(text.toLowerCase());
		});
		return {
			...state,
			filtered_tasks: searchResults,
		};
	}
	if (type === Types.SEARCH_TASK) {
		console.log(payload, state);
		if (payload.length > 0) {
			const searchResults = state.tasks.filter((task) => task.name.toLowerCase().startsWith(payload.toLowerCase()));
			return { ...state, filteredTasks: searchResults, isSearching: true };
		} else {
			return { ...state, filteredTasks: [], isSearching: false };
		}
	}

	if (type === Types.SORT_TASKS) {
		console.log(payload);
		// const { sort } = state;
		// if (sort === 'due-date') {
		// 	sortedTasks = sortedTasks.sort((a, b) => {
		// 		if (typeof a.dueDate === 'object' && a.dueDate !== null) {
		// 			a.dueDate = JSON.parse(JSON.stringify(a.dueDate));
		// 		}
		// 		if (typeof b.dueDate === 'object' && b.dueDate !== null) {
		// 			b.dueDate = JSON.parse(JSON.stringify(b.dueDate));
		// 		}

		// 		return new Date(a.dueDate) - new Date(b.dueDate);
		// 	});
		// }

		return {
			...state,
		};
	}

	throw new Error(`No Matching ${type} - action type`);
};

export default taskReducer;
