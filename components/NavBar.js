import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import NavTab from "./NavTab";
import Menu from "@material-ui/core/Menu";
import Button from "./Button";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import { saveSvgAsPng } from "save-svg-as-png";
import Link from "next/link";
import { useRouter } from "next/router";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import clsx from "clsx";

const useStyles = makeStyles(theme => {
  console.log(theme.spacing(2))
  return {
    root: {
      flexGrow: 1
    },
    ul: {
      listStyleType: "none"
    },
    li: {
      display: "inline",
      padding: theme.spacing(2)
      },
    active: {
      background: theme.palette.grey[200]
    }
  };
});

function exportPng() {
  return saveSvgAsPng(document.getElementById("svg"), "diagram.png", {
    scale: 8,
    backgroundColor: "white"
  });
}

const NavBar = () => {
  const classes = useStyles();

  const NavTab = ({ to, children }) => {
    const router = useRouter();
    const classList = clsx([
      classes.li,
      to == router.pathname ? classes.active : false
    ]);
    return (
      <li className={classList}>
        <Link href={to}>
          <a>{children}</a>
        </Link>
      </li>
    );
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
          <ul className={classes.ul}>
            <NavTab to="/">Home</NavTab>
            <NavTab to="/edit">Edit</NavTab>
          </ul>
      </AppBar>
    </div>
  );
};

export default NavBar;
