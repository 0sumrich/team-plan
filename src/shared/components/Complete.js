import React from 'react';
import Radio from './Radio';

const Complete = ({ complete, id, handleCompleteChange }) => {
	return (
		<div style={{ textAlign: "center" }}>
			<p
				style={{
					display: "block",
					fontSize: "0.75em",
					margin: 0,
					padding: 3
				}}
			>
				Complete ?
			</p>
			<Radio
				checked={complete ? true : false}
				handleChange={handleCompleteChange}
				id={id}
			>
				Yes
			</Radio>
			<Radio
				checked={complete ? false : true}
				handleChange={handleCompleteChange}
				id={id}
			>
				No
			</Radio>
		</div>
	);
};

export default Complete;