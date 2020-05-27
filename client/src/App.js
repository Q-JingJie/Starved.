import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";

import GetRadius from "./components/GetRadius";
import Results from "./components/Results";

class App extends Component {
  constructor() {
    super();
    this.state = {
      latitude: null,
      longitude: null,
      venues: null,
      loaded: false,
    };

    this.callAPI = this.callAPI.bind(this);
  }

  callAPI(lat, long) {
    const query = window.location.pathname + window.location.search;
    fetch(query)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          latitude: lat,
          longitude: long,
          venues: data.response.venues,
          loaded: true,
        });
      });
  }

  render() {
    return (
      <Router>
        <Route path="/">
          <GetRadius callAPI={this.callAPI} />
        </Route>
        <Route path="/Results">
          {this.state.loaded ? (
            <Results
              rand={this.state.sendRandom}
              venues={this.state.venues}
              lat={this.state.latitude}
              long={this.state.longitude}
            />
          ) : null}
        </Route>
      </Router>
    );
  }
}

export default App;
