import React, { Component } from "react";
import MarkerMap from "./MarkerMap";

// React-bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";

class Results extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    this.scrollRef.current.scrollIntoView({ behaviour: "smooth" });
  }

  componentDidUpdate() {
    this.scrollRef.current.scrollIntoView({ behaviour: "smooth" });
  }

  // Opens location in google maps
  handleClick(lat, long) {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${long}`
    );
  }
  render() {
    return (
      <div>
        {this.props.venues.length > 0 ? (
          this.props.rand ? null : (
            <Container className="sub-ctn-2" fluid>
              <Row>
                <div ref={this.scrollRef} id="dis">
                  {`Discovered ${this.props.venues.length} dining ${
                    this.props.venues.length > 1 ? "locations" : "location"
                  } near you!`}
                </div>
              </Row>
              <Row>
                <CardColumns>
                  {this.props.venues.map((venue, idx) => {
                    return (
                      <Card key={idx} className="card">
                        <Card.Header>
                          <MarkerMap
                            lat={this.props.lat}
                            long={this.props.long}
                            locLat={venue.location.lat}
                            locLong={venue.location.lng}
                          ></MarkerMap>
                        </Card.Header>
                        <Card.Body>
                          <Card.Title className="card-title">
                            <b>{venue.name}</b>
                          </Card.Title>
                          <Card.Text className="card-txt">
                            <b>Location:</b>{" "}
                            {`${venue.location.formattedAddress[0]}`}
                            <br></br>
                            <b>Distance:</b>{" "}
                            {Number(venue.location.distance) === 1000
                              ? "1km"
                              : `${venue.location.distance}m`}
                            <br></br>
                            <b>Establishment:</b>{" "}
                            {`${venue.categories[0].name}`}
                            <br></br>
                          </Card.Text>
                          <button
                            className="btn1"
                            onClick={() =>
                              this.handleClick(
                                venue.location.lat,
                                venue.location.lng
                              )
                            }
                          >
                            Open in Google Maps
                          </button>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </CardColumns>
              </Row>
            </Container>
          )
        ) : (
          <Container ref={this.scrollRef} className="sub-ctn-3" fluid>
            <Row>
              <div>
                Unfortunately, there are no dining options available within the
                specified search radius.
              </div>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default Results;
