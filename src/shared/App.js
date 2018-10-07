import React, { Component } from "react";
import Chart from "./components/Chart";
import Button from "./components/Button";
import Test from "./components/Test";
import { saveSvgAsPng } from "save-svg-as-png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import routes from "./routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        csv: [],
        values: []
      }
    };
    this.handlePngClick = this.handlePngClick.bind(this);
  }

  handlePngClick() {
    saveSvgAsPng(document.getElementById("svg"), "diagram.png", {
      scale: 8,
      backgroundColor: "white"
    });
  }

  render() {
    const style = {
      width: "95vw",
      height: "95vw"
    };

    /*
    return (
        <div style={style}>          
          <Button>Edit</Button>
          <Button id="saveButton" click={this.handlePngClick}>Export as PNG</Button>
          <Chart data={this.state.data} />
          <Test>Info goes here</Test>
        </div>
    )
    */

    return (
      <div>
      <Button><Link to="/edit">Edit</Link></Button>
      <Button id="saveButton" click={this.handlePngClick}>Export as PNG</Button>
        {routes.map(({ path, exact, component: C, ...rest }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={props => <C {...props} {...rest} />}
          />
        ))}
      </div>
    );
  }
}

export default App;
