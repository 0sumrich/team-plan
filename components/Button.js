import React from "react";
import PropTypes from "prop-types";

function Button(props) {
  const { children, color, handleClick, id, data } = props;
  let c = color
  if(c.indexOf('darken')>0){
    c += " white-text"
  }
  return (
    <a id={id} className={`btn ${c}`} onClick={e => handleClick(e)} data-task={data ? JSON.stringify(data) : null}>
      {children}
    </a>
  );
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  color: PropTypes.string,
  position: PropTypes.string,
  handleClick: PropTypes.func,
  data: PropTypes.object
};

Button.defaultProps = {
  color: "grey lighten-3"
};

export default Button;
