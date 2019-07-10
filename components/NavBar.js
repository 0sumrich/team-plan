import React, { Fragment } from "react";
import NavTab from "./NavTab";
import Button from "./Button";
import { saveSvgAsPng } from "save-svg-as-png";

function exportPng(){
  return saveSvgAsPng(document.getElementById("svg"), "diagram.png", {
      scale: 8,
      backgroundColor: "white"
    });
}

const NavBar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <ul id="nav-mobile">
          <NavTab to="/">Home</NavTab>
          <NavTab to="/edit">Edit</NavTab>
          <li><a className="btn" onClick={() => exportPng()}>Export as PNG</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;