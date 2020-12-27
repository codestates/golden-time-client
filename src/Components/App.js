import React, { Component } from "react";
import Router from "./Router";
import './font.css';
import GlobalStyles from "./GlobalStyles";

class App extends Component {
  render() {
    return (
      <>
        <Router />
        <GlobalStyles />
      </>
    );
  }
}

export default App;