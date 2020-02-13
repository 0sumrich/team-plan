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

const useStyles = makeStyles(theme => {
  return {
    root: {
      flexGrow: 1
    },
    active: {
      background: theme.palette.grey[200]
    },
    ul: {
      listStyleType: "none"
    },
    li: {
      display: "inline",
      padding: theme.spacing(2),
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
    const active = to == router.pathname ? "active" : "";
    return (
      <li className={`${classes.li} ${active}`}>
        <Link href={to}>
          <a>{children}</a>
        </Link>
      </li>
    );
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Container>
          <ul className={classes.ul}>
            <NavTab to="/">Home</NavTab>
            <NavTab to="/edit">Edit</NavTab>
          </ul>
        </Container>
      </AppBar>
    </div>
  );
};

export default NavBar;
