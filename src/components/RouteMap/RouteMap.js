import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './RouteMap.css';
import withStyles from '../../decorators/withStyles';
import gMaps from '../../utils/gMaps';

const BUS_STOP_MAGNITUDE = 1000000;
const BUS_MAGNITUDE      = 10000000;
const ANN_ARBOR = {
  lat: 42.2733204,
  lng: -83.7376894
}

function getMidpoint(items, propName) {
  let values =  _.chain(items)
    .pluck(propName)
    .map(x => parseInt(x));

  let min = values.min().value();
  let max = values.max().value();

  return min + (max - min) / 2
}

function busStopMarker(stop) {
  return gMaps.createBusStop(
    stop.lattitude / BUS_STOP_MAGNITUDE,
    stop.longitude / BUS_STOP_MAGNITUDE,
    stop.name,
    stop.isTimePoint);
}

function busMarker(location) {
  return gMaps.createBus(
    location.lat / BUS_MAGNITUDE,
    location.longitude / BUS_MAGNITUDE,
    `Bus #${location.routeAbbr} ${location.routeDirection}`)
}

@withStyles(styles)
class RouteDetails extends React.Component {

  constructor() {
    super();
  }

  drawMap() {
    this.map = gMaps.createMap(ANN_ARBOR.lat, ANN_ARBOR.lng, 13, ReactDOM.findDOMNode(this.refs.mapcanvas));
  }

  getMarkers() {
    let busStopMarkers = this.props.stops.map(busStopMarker);
    let busMarkers = this.props.locations.map(busMarker);

    return busStopMarkers.concat(busMarkers);
  }

  drawMarkers() {
    if(this.markers) {
      this.markers.forEach(m => m.setMap(null));
    }

    this.markers = this.getMarkers();

    this.markers.forEach(m => m.setMap(this.map));
  }

  getCenter() {
    return {
      lat: getMidpoint(this.props.stops, "lattitude") / BUS_STOP_MAGNITUDE,
      lng: getMidpoint(this.props.stops, "longitude") / BUS_STOP_MAGNITUDE
    };
  }

  setCenter() {
    if(!this.map) return;
    if(!this.props.stops.length) return;

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
