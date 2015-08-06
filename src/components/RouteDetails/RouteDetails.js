import React, { PropTypes } from 'react';
import styles from './RouteDetails.css';
import withStyles from '../../decorators/withStyles';
import BusRouteStore from '../../stores/BusRouteStore';

@withStyles(styles)
class RouteDetails extends React.Component {

  constructor() {
    super();
    this.state = {
      busRoute: null,
      stops: []
    };

    this._onStoreChange = () => this.getState();
  }

  componentDidMount() {
    console.log('mount');
    BusRouteStore.addListener('change', this._onStoreChange);
    this.getState();
  }

  componentWillUnmount() {
    BusRouteStore.removeListener('change', this._onStoreChange);
  }

  getState() {
    let busRoute = BusRouteStore.getRoute(this.props.id);
    let stops = BusRouteStore.getStops(this.props.id);

    this.setState({busRoute, stops});
  }

  render() {
    if(!this.state.busRoute) return null;
    
    let stops = this.state.stops.map(s => <div key={s.stopID}>{s.name}</div>);

    return (
      <div className="RouteDetails">
        <h2>Route Details</h2>
        Name: {this.state.busRoute.name}
        Stops: {stops}
      </div>
    );
  }
}

export default RouteDetails;
