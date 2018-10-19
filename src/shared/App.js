import React, { Component } from "react";
import Chart from "./components/Chart";
import Button from "./components/Button";
import Test from "./components/Test";
import NoMatch from './components/NoMatch';
import Nav from './components/Nav';
import { saveSvgAsPng } from "save-svg-as-png";
import { Route, Switch } from "react-router-dom";
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

    return (
      <div>
        <Nav dest="/test">Test</Nav>
        <Nav dest="/edit">Edit</Nav>
        <Nav dest="/">Home</Nav>
        <Button id="saveButton" click={this.handlePngClick}>Export as PNG</Button>
        <Switch>
          {routes.map(({ path, exact, component: Component, ...rest }) => (
            <Route key={path} path={path} exact={exact} render={(props) => (
              <Component {...props} {...rest} />
            )} />
          ))}
          <Route render={(props) => <NoMatch {...props} /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
