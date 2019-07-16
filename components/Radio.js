import React from "react";

const Radio = ({ children, checked, id, handleChange }) => {
	return (
		<>
			<label className="radio">
				<input
					type="radio"
					name={id}
					value={children == "Yes" ? "TRUE" : "FALSE"}
					onChange={handleChange}
					checked={checked}
				/>
				<span className="flow-text">{children}</span>
			</label>
		</>
	);
};

export default Radio;
