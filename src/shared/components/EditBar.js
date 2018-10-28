import React from "react";
import Button from "./Button";
import toBool from '../helper/toBool';

function EditBar(props) {
	const { task, handleUpdateClick } = props;
	let btnStyle = Button.defaultProps.style;
	const UpdateButton = () => (
		<Button
			id={`button${task.data._id}`}
			handleClick={handleUpdateClick}
			form
		>
			Update
		</Button>
	);

	const Radio = ({ checked, children }) => {
		return (
			<React.Fragment>
				<input
					style={{ display: "inline", margin: "0 5px", padding: 3 }}
					value={children=="Yes" ? "TRUE" : "FALSE"}
					name={task.data._id}
					type="radio"
					defaultChecked={checked}
				/>
				<label htmlFor={children} style={{ fontSize: "0.75em" }}>
					{children}
				</label>
			</React.Fragment>
		);
	};

	const Complete = () => (
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
			<Radio checked={toBool(task.data.complete)}>Yes</Radio>
			<Radio checked={!toBool(task.data.complete)}>No</Radio>
		</div>
	);

	return (
		<div>
			<Complete />
			<UpdateButton />
			<style jsx>{`
          div {            
           display: grid;
           grid-template-columns: 1fr 1fr 1fr;
      `}</style>
		</div>
	);
}

export default EditBar;

//<EditBar task={task} handleChangeClick={handleChangeClick} />
