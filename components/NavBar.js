import Link from "next/link";
import React, { Fragment } from "react";
import NavTab from "./NavTab";
import Button from "./Button";

// const NavBar = ({ active, handlePngClick, handleNavClick }) => (
//   <Fragment>
//     <Link href="/">
//       <a className="nav">Home</a>
//     </Link>
//     <Link href="/edit">
//       <a className="nav">Edit</a>
//     </Link>
//     <Button id="saveButton" handleClick={handlePngClick}>
//       Export as PNG
//     </Button>
//     <style jsx>{`
//           .nav, a {
//             font-family: 'Quicksand', sans-serif;
//             text-align: center;
//             display: inline-block;
//             text-decoration: none;
//             border-radius: 5px;
//             color: black;
//             border: 1px solid black;
//             padding: 5px 10px;
//             font-family: inherit;
//             cursor: pointer;
//             background: white;
//             position: initial;
//             top: 0;
//             width: 100px;
//             margin: 5px;
//           }
//           .nav:focus {outline:0;}
//       `}</style>
//   </Fragment>
// );

const NavBar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <ul id="nav-mobile">
          <NavTab to="/">Home</NavTab>
          <NavTab to="/edit">Edit</NavTab>
          <li><a className="btn">Export as PNG</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;