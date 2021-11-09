import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
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
		<Wrapper>
			<Formik
				initialValues={{
					keyword: '',
					sortBy: '',
				}}
				validationSchema={Yup.object({
					keyword: Yup.string(),
				})}>
				<Form className="search-bar-container">
					<MyTextInput
						label="Search"
						name="keyword"
						type="text"
						placeholder="Search Task"
						onChange={handleChange}
						value={keyword}
						className="search-bar"
					/>

					<MySelect label="Sort By" name="sortBy" onChange={handleSortTask} className="select-sort">
						<option value="">Sort By</option>
						<option value="name">Name</option>
						<option value="dueDate">Due Date</option>
						<option value="priority">Priority</option>
					</MySelect>
				</Form>
			</Formik>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.search-bar-container {
		display: flex;
		justify-content: center;
		.search-bar {
			margin-right: 20px;
			height: 30px;
			border-radius: 3px;
			width: 300px;
			padding: 3px 10px;
			border: 1px solid grey;
			font-weight: bold;
		}
		.select-sort {
			height: 30px;
			border-radius: 3px;
			width: 100px;
		}
	}
`;

export default SearchBar;
