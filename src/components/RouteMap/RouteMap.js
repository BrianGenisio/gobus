import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './RouteMap.css';
import withStyles from '../../decorators/withStyles';

const LOCATION_MAGNITUDE = 1000000;

@withStyles(styles)
class RouteDetails extends React.Component {

  constructor() {
    super();
  }

  drawMap() {
    var mapOptions = {
      center: { lat: 42.2733204, lng: -83.7376894},
      zoom: 13
    };

    let element = ReactDOM.findDOMNode(this.refs.mapcanvas);
    this.map = new window.google.maps.Map(element, mapOptions);

  }

  drawMarkers() {
    if(this.markers) {
      this.markers.forEach(m => m.setMap(null));
    }

    this.markers = this.props.stops.map(s => new window.google.maps.Marker({
      position: {
        lat: s.lattitude / LOCATION_MAGNITUDE,
        lng: s.longitude / LOCATION_MAGNITUDE
      },
      title: s.name
    }));

    this.markers.forEach(m => m.setMap(this.map));
  }

  center(max, min) {
    return min + (max - min) / 2;
  }

  getCenter() {
    let latitudes = _.chain(this.props.stops)
      .pluck("lattitude")
      .map(x => parseInt(x));

    let longitudes = _.chain(this.props.stops)
      .pluck("longitude")
      .map(x => parseInt(x));

    return {
      lat: this.center(latitudes.max().value(), latitudes.min().value()) / LOCATION_MAGNITUDE,
      lng: this.center(longitudes.max().value(), longitudes.min().value()) / LOCATION_MAGNITUDE
    };
  }

  setCenter() {
    if(!this.map) return;
    this.map.setCenter(this.getCenter());
  }

  componentDidMount() {
    this.drawMap()
  }

  render() {

    this.drawMarkers();
    this.setCenter();

    return (
      <div className="RouteMap">
        <div className="map" ref="mapcanvas"></div>
      </div>
    );
  }
}

export default RouteDetails;
