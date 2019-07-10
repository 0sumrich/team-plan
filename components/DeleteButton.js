import React from "react";
import Button from "./Button";

const DeleteButton = ({ id, handleClick }) => {
	return (
		<React.Fragment>
		<Button
			id={`delete${id}`}
			handleClick={handleClick}
			bg={["#f00", "#bf0000"]}
			color={'white'}
			border={'white'}
			form
		>
			Delete
		</Button>
		<style jsx>{`
          #delete${id} {            
            color: white;
            margin: 100px;
          }
      `}</style>
		</React.Fragment>
	);
};

export default DeleteButton;
