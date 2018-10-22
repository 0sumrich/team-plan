import React from 'react';
import { Link } from "react-router-dom";
import Button from './Button';

function Nav(props){
  return ( <Link to={props.dest}><Button>{props.children}</Button></Link> )
}

export default Nav