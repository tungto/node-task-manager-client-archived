import { Form, Formik } from 'formik';
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { TaskContext } from '../../context/TaskContext';
import MySelect from '../UI/MySelect/MySelect';
import MyTextInput from '../UI/MyTextInput/MyTextInput';

const SearchBar = () => {
	const { searchTask, sortTasks } = useContext(TaskContext);

	const [keyword, setKeyword] = useState('');
	const [sortBy, setSortBy] = useState(null);

	useEffect(() => {
		searchTask(keyword);
	}, [keyword]);

	useEffect(() => {
		sortTasks(sortBy);
	}, [sortBy]);

	const handleChange = (e) => {
		setKeyword(e.target.value);
	};

	const handleSortTask = (e) => {
		setSortBy(e.target.value);
	};

	return (
		<Formik
			initialValues={{
				keyword: '',
				sortBy: null,
			}}
			validationSchema={Yup.object({
				keyword: Yup.string(),
			})}>
			<Form className="search-bar-container">
				<MyTextInput label="Search" name="keyword" type="text" placeholder="Search Task" onChange={handleChange} value={keyword} />

				<MySelect label="Sort By" name="sortBy" onChange={handleSortTask}>
					<option value="">Sort By</option>
					<option value="name">Name</option>
					<option value="dueDate">Due Date</option>
					<option value="priority">Priority</option>
				</MySelect>
			</Form>
		</Formik>
	);
};

const Wrapper = styled.div`
	.search-bar {
		padding: 10px;
		width: 80%;
		border-radius: var(--radius);
		font-size: 1rem;
	}
	@media (min-width: 800px) {
		margin-top: 3rem;
		margin-bottom: 1rem;
	}
`;

export default SearchBar;
