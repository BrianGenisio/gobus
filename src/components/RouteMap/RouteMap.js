import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './RouteMap.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class RouteDetails extends React.Component {

  constructor() {
    super();
  }

  drawMap() {
    var mapOptions = {
      center: { lat: 42.2733204, lng: -83.7376894},
      zoom: 14
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
        lat: s.lattitude / 1000000,
        lng: s.longitude / 1000000
      },
      title: s.name
    }));

    this.markers.forEach(m => m.setMap(this.map));
  }

  componentDidMount() {
    this.drawMap()
  }

  render() {

    this.drawMarkers();

    return (
      <div className="RouteMap">
        <h2>Route Map</h2>

        <div className="map" ref="mapcanvas"></div>


      </div>
    );
  }
}

export default RouteDetails;
