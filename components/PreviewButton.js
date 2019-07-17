import React from 'react';
import Button from './Button';

const PreviewButton = ({ id, handleClick }) => {
	return (
		<Button id={`button${id}`} handleClick={handleClick} form>
			Preview
		</Button>
	);
};

export default PreviewButton;