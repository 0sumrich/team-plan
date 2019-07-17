import React from "react";
import Button from "./Button";

const AddObjectiveBtn = ({ringNo, handleClick}) => {
  return ringNo<1 ?(
    
      <div className="add-objective-align">
      <div></div>
      <Button 
      id={"add-objective"}
			color="teal darken-2"
			border="white"
      form
			handleClick={handleClick}>Add Objective</Button>
      <style jsx>{`
					.add-objective-align {
						display: grid;
						grid-template-columns: 1fr 1fr;
					}
				`}</style>
        </div>
    ) 
   : null;
};

export default AddObjectiveBtn;
