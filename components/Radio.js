import React from 'react';

const Radio = ({ children, checked, id, handleChange }) => {
	return (
		<React.Fragment>
			<input
				style={{ display: "inline", margin: "0 5px", padding: 3 }}
				value={children == "Yes" ? "TRUE" : "FALSE"}
				name={id}
				type="radio"
				onChange={handleChange}
				checked={checked}
			/>
			<label htmlFor={children} style={{ fontSize: "0.75em" }}>
				{children}
			</label>
		</React.Fragment>
	);
};

export default Radio;