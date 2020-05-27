import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DisplayMap from "./DisplayMap";
// React-bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

const defaultState = {
  locRetrieved: false,
  locError: false,
  searchRadius: 100,
  latitude: null,
  longitude: null,
};

class GetRadius extends Component {
  constructor() {
    super();

    this.state = defaultState;

    this.getLocation = this.getLocation.bind(this);
    this.usePosition = this.usePosition.bind(this);
    this.locError = this.locError.bind(this);
    this.changeRadius = this.changeRadius.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Reset state on load
  componentDidMount() {
    this.setState(defaultState);
  }

  // Retreive location data from user (Permission required)
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.usePosition, this.locError);
    } else {
      this.locError();
    }
  }

  // No error in retrieving location data
  usePosition(pos) {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;

    this.setState({ locRetrieved: true, latitude: lat, longitude: long });
  }

  // Location error callback
  locError() {
    this.setState({ locError: true });
  }

  changeRadius(e) {
    this.setState({ searchRadius: Number(e.target.value) });
  }

  handleSubmit() {
    let lat = this.state.latitude;
    let long = this.state.longitude;
    let rad = this.state.searchRadius;

    let path = `/Results?lat=${lat}&long=${long}&rad=${rad}`;
    this.props.history.push(path);
    this.props.callAPI(this.state.latitude, this.state.longitude);
  }

  render() {
    return (
      <div>
        {this.state.locRetrieved ? (
          <Container className="sub-ctn-1" fluid>
            <Row>
              <DisplayMap
                class="center-map"
                lat={this.state.latitude}
                long={this.state.longitude}
                searchRadius={this.state.searchRadius}
              />
            </Row>
            <Row>
              <input
                className="slider"
                type="range"
                min="50"
                max="1000"
                value={this.state.searchRadius}
                onChange={this.changeRadius}
              ></input>
            </Row>
            <Row>
              <span className="centered-txt" style={{ paddingTop: "10px" }}>
                Search Radius
              </span>
            </Row>
            <Row>
              <span
                className="centered-txt"
                style={{ paddingTop: "10px", fontSize: "30px" }}
              >
                {this.state.searchRadius === 1000
                  ? "1km"
                  : `${this.state.searchRadius}m`}
              </span>
            </Row>
            <Row>
              <button
                className="btn1"
                name="search"
                onClick={this.handleSubmit}
              >
                Search all listings
              </button>
            </Row>
            <Row>
              <footer>
                A mini project by: Q-JingJie (2020)<br></br>
                <a href="https://github.com/Q-JingJie/Starved.">
                  Link to GitHub repository
                </a>
              </footer>
            </Row>
          </Container>
        ) : (
          <Container className="sub-ctn-1" fluid>
            <Row>
              <Image id="logo" src={require("../starved.svg")} fluid />
            </Row>
            <Row>
              <h1 id="title-txt">Discover dining options in your vicinity.</h1>
            </Row>
            <Row>
              <button
                className="btn1"
                name="locationBtn"
                onClick={this.getLocation}
              >
                Get Current Location
              </button>
            </Row>
            <Row>
              <footer>
                A mini project by: Q-JingJie (2020)<br></br>
                <a href="https://github.com/Q-JingJie/Starved.">
                  Link to GitHub repository
                </a>
              </footer>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default withRouter(GetRadius);
