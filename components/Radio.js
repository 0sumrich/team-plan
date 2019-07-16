import React from "react";

// const Radio = ({ children, checked, id, handleChange }) => {
// 	return (
// 		<React.Fragment>
// 			<input
// 				style={{ display: "inline", margin: "0 5px", padding: 3 }}
// 				value={children == "Yes" ? "TRUE" : "FALSE"}
// 				name={id}
// 				type="radio"
// 				onChange={handleChange}
// 				checked={checked}
// 			/>
// 			<label htmlFor={children} style={{ fontSize: "0.75em" }}>
// 				{children}
// 			</label>
// 		</React.Fragment>
// 	);
// };

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
				<span class="flow-text">{children}</span>
			</label>
		</>
	);
};

export default Radio;
