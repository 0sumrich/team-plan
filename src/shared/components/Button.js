import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  constructor(props){
    super(props);
    this.state = {
      hover: false,
      active: false
    }
  }
  hover() {
    this.setState(prevState => {
      return { hover: !prevState.hover };
    });
  };

  handleClick(e){
    //e.preventDefault();
    if(this.props.form){
      e.preventDefault();
    }
    this.setState(prevState => {
      return {active: !prevState.active}
    });
    if(this.props.handleClick) {
      this.props.handleClick(e)
    }
  }

  render() {
    const {
      style,
      bg,
      id,
      form,
      color,
      border,
      position,
      children
    } = this.props;   

    return (
      <React.Fragment>
        <button
        className="btn"
        id={id}
        onClick={e => this.handleClick(e)}
        onMouseEnter={e => this.hover(e)}
        onMouseLeave={e => this.hover(e)}
        style={style.color ? {color: style.color} : null}
        >{children}</button>
        <style jsx>{`
          #${id} {            
            border-radius: ${style.borderRadius};
            color: ${color};
            border: 1px solid ${border};
            padding: ${style.padding};
            font-family: ${style.fontFamily};
            cursor: ${style.cursor};
            background: ${this.state.hover||this.state.active ? bg[1]: bg[0]};
            position: ${position};
            top: 0;
            width: 100px;
            margin: 5px;
          }
          button:focus {outline:0;}
      `}</style>
      </React.Fragment>
  )
  }
}

Button.defaultProps = {
  style: {
    borderRadius: '5px',
    padding: '5px 10px',
    fontFamily: 'inherit',
    cursor: 'pointer'
  },
  color: 'black',
  border: 'black',
  position: 'initial',
  bg: ['white', '#e5e5e5']
};

Button.propTypes = {
  style: PropTypes.object,
  bg: PropTypes.array,
  id: PropTypes.string.isRequired,
  form: PropTypes.bool,
  color: PropTypes.string,
  border: PropTypes.string,
  position: PropTypes.string,
  children: PropTypes.any.isRequired
}

export default Button;
