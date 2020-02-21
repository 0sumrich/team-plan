import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import NavTab from "./NavTab";
import Menu from "@material-ui/core/Menu";
import Button from "./Button";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { saveSvgAsPng } from "save-svg-as-png";
import IconButton from "@material-ui/core/IconButton";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "next/link";
import { useRouter } from "next/router";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import clsx from "clsx";

const useStyles = makeStyles(theme => {
  return {
    root: {
      flexGrow: 1
    },
    ul: {
      listStyleType: "none",
      margin: 0
    },
    li: {
      display: "inline",
      padding: theme.spacing(2)
    },
    active: {
      background: theme.palette.grey[200]
    },
    export: {
      color: theme.palette.info.main
    }
  };
});

function exportPng() {  
  return saveSvgAsPng(document.getElementById("svg"), `team plan ${process.env.YEAR}.png`, {
    scale: 6,
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
          <Tooltip title="Download as PNG" aria-label="download">
            <IconButton
              aria-label="download"
              className={classes.export}
              onClick={exportPng}
            >
              <SaveAltIcon />
            </IconButton>
          </Tooltip>
        </ul>
      </AppBar>
    </div>
  );
};

export default NavBar;
