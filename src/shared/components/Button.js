import React, { Component } from 'react';

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
        >{children}</button>
        <style jsx>{`
          button {            
            border-radius: ${style.borderRadius};
            border: ${style.border};
            padding: ${style.padding};
            font-family: ${style.fontFamily};
            cursor: ${style.cursor};
            background: ${this.state.hover||this.state.active ? bg[1]: bg[0]};
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
    border: '1px solid black',
    borderRadius: '5px',
    padding: '5px 10px',
    fontFamily: 'inherit',
    cursor: 'pointer'
  },
  bg: ['white', '#e5e5e5']
}

export default Button;
