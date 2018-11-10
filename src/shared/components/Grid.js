import React, { Component } from "react";
import getObjectives from "../helper/getObjectives";
import getRings from "../helper/getRings";
import sortData from "../helper/sortData";
import Title from "./Title";
import Objectives from "./Objectives";

function Grid(props) {
	const {
		data,
		handleEditClick,
		handlePreviewClick,
		handleCompleteChange,
		handleDeleteClick,
		handleTextChange
	} = props;
	const csv = sortData(data.csv);
	const values = data.values;
	const rings = getRings(data.csv);
	rings[0] = "Objectives";
	const objectives = getObjectives(data.csv);

	/*
	return (
		<React.Fragment>
			<form>
				{rings.map((ring, i) => {
					return (
						<React.Fragment key={"frag" + i}>
							<Title key={"ring" + i}>{ring}</Title>
							<Objectives
								objectives={objectives}
								data={csv[i]}
								isObjectivesList={i == 0 ? true : false}
								handleEditClick={handleEditClick}
								handlePreviewClick={handlePreviewClick}
								handleCompleteChange={handleCompleteChange}
								handleDeleteClick={handleDeleteClick}
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
	*/

		return (
		<React.Fragment>
			<form>
				{rings.map((ring, i) => {
					return (
						<React.Fragment key={"frag" + i}>
							<Title key={"ring" + i}>{ring}</Title>
							<Objectives
								objectives={objectives}
								data={csv[i]}
								isObjectivesList={ring=="Objectives" ? true : false}
								handleEditClick={handleEditClick}
								handlePreviewClick={handlePreviewClick}
								handleCompleteChange={handleCompleteChange}
								handleDeleteClick={handleDeleteClick}
								handleTextChange={handleTextChange}
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
}

export default Grid;
