import { useField } from 'formik';
import React from 'react';
const MySelect = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div>
			{/* <label htmlFor={props.id || props.name}>{label}</label> */}
			<select {...field} {...props} />
			{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
		</div>
	);
};

export default MySelect;
