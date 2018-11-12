import React, { Component } from "react";
import Chart from "./components/Chart";
import Button from "./components/Button";
import Test from "./components/Test";
import NoMatch from "./components/NoMatch";
import Nav from "./components/Nav";
import NavBar from './components/NavBar';
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
      },
      nav: [true, false]
    };
    this.handlePngClick = this.handlePngClick.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  handlePngClick(e) {
    saveSvgAsPng(document.getElementById("svg"), "diagram.png", {
      scale: 8,
      backgroundColor: "white"
    });
  }

  handleNavClick(e) {
    const res = e.target.id == "home" ? 0 : 1;
    console.log(res);
    this.setState(prevState => {
      return {
        nav : prevState.nav.map((b, i) => i==res ? true : false)
      }
    }) 
  }

  render() {
    const style = {
      width: "95vw",
      height: "95vw"
    };

    return (
      <div>
        <NavBar
          active={this.state.nav}
          handlePngClick={this.handlePngClick}
          handleNavClick={this.handleNavClick}
        />
        <Switch>
          {routes.map(({ path, exact, component: Component, ...rest }) => (
            <Route
              key={path}
              path={path}
              exact={exact}
              render={props => <Component {...props} {...rest} />}
            />
          ))}
          <Route render={props => <NoMatch {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
