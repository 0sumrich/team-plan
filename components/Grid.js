import React, { Component } from "react";
import getObjectives from "../helper/getObjectives";
import getRings from "../helper/getRings";
import sortData from "../helper/sortData";
import Title from "./Title";
import Objectives from "./Objectives";
import AddObjectiveBtn from "./AddObjectiveBtn";

function Grid(props) {
	const {
		data,
		handlePreviewClick,
		handleCompleteChange,
		handleDeleteClick,
		handleTextChange,
		handleAddClick,
		handleAddObjectiveClick
	} = props;
	const { objectives, tasks, values } = data;

	const csv = sortData(objectives, tasks);
	const rings = getRings(tasks);
	rings.splice(0, 0, "Objectives");
	
	return (
		<React.Fragment>
			<form>
				{rings.map((ring, i) => {
					const isObjectivesList = ring == "Objectives" ? true : false
					return (
						<React.Fragment key={"frag" + i}>
							<Title key={"ring" + i}>{ring}</Title>
							<AddObjectiveBtn
								ringNo={i}
								handleClick={handleAddObjectiveClick}
							/>
							<Objectives
								objectives={objectives}
								team={ring}
								data={csv[i]}
								isObjectivesList={isObjectivesList}
								handlePreviewClick={handlePreviewClick}
								handleCompleteChange={handleCompleteChange}
								handleDeleteClick={handleDeleteClick}
								handleTextChange={handleTextChange}
								handleAddClick={handleAddClick}
							/>
						</React.Fragment>
					);
				})}
			</form>
			<style jsx>{`
				form {
					width: 100%;
					margin: 5px;
				}
			`}</style>
		</React.Fragment>
	);
	// return null;
}

export default Grid;
