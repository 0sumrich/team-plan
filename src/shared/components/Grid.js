import React, { Component } from "react";
import getObjectives from '../helper/getObjectives';
import getRings from '../helper/getRings';
import sortData from '../helper/sortData';

const Title = ({children, i}) => {
	return (
		<React.Fragment>
			<p>{children}</p>
			<br />
			<style jsx>{`
	          p {            
	            font-family: inherit;
	            display: block;
	          }
	      `}</style>
		</React.Fragment>
	)
}
const Task = ({task}) => {
	return (
		<React.Fragment>
			<input type="text" className="task" value={task.data.text} onChange={null}/>
			<style jsx>{`
	          input {            
	            font-family: inherit;
	            display: block;
	            width: 80%;
	            padding: 10px 5px;
	            border-radius: 5px;
				margin: 5px 0px;
	          }
	      `}</style>
		</React.Fragment>
	)
};

const Objective = ({task}) => {
	return <p>{task.data.objective}</p>
}

const Tasks = ({arr}) => arr.map((task, i) => {
	return (
		<React.Fragment key={"task"+i}>
			<div>
				<Task task={task} />
			</div>
			<style jsx>{`
				div {
					display: grid;
					grid-template-columns: 1fr 1fr
				}
			`}</style>
		</React.Fragment>
	)
});

const Objectives = ({objectives, data}) => objectives.map((o, i) => {
	const objective = o.text;
	const filtered = data.filter(k => k.data.objective==objective);
	//<Tasks arr={filtered} />
	return (
		<React.Fragment key={"objective"+i}>
			<p>{objective}</p>
			<Tasks arr={filtered} />
		</React.Fragment>
	)
})

function Grid(props){
	const {data} = props;
	const csv = sortData(data.csv);
	const values = data.values;
	const rings = getRings(data.csv);
	rings[0]="Objectives";
	const objectives = getObjectives(data.csv);
	//<Objectives objectives={objectives} data={csv} />
	return (
		<React.Fragment>
		<form>
			{rings.map((ring, i) => {
				return (
					<React.Fragment key={"frag"+i}>
						<Title key={"ring"+i}>{ring}</Title>
						<Objectives objectives={objectives} data={csv[i]} />
					</React.Fragment>
				)
			})}
		</form>
		<style jsx>{`
			form {
				width: 100%;
				margin: 5px;
			}
		`}</style>
		</React.Fragment>
	)
}

//ring title, list, edit button, complete ? button

export default Grid