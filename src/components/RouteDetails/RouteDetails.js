import React, { PropTypes } from 'react';
import styles from './RouteDetails.css';
import withStyles from '../../decorators/withStyles';
import BusRouteStore from '../../stores/BusRouteStore';
import BusLocationStoreFactory from '../../stores/BusLocationStoreFactory';
import RouteMap from '../RouteMap';

@withStyles(styles)
class RouteDetails extends React.Component {

  constructor() {
    super();
    this.state = {
      busRoute: null,
      stops: [],
      locations: []
    };

    this._onStoreChange = () => this.getState();
  }

  componentDidMount() {
    this.locationStore = BusLocationStoreFactory.create(this.props.id);

    BusRouteStore.addListener('change', this._onStoreChange);
    this.locationStore.addListener('change', this._onStoreChange);

    this.getState();
  }

  componentWillUnmount() {
    BusRouteStore.removeListener('change', this._onStoreChange);
    this.locationStore.removeListener('change', this._onStoreChange);
    this.locationStore.dispose()
  }

  getState() {
    let busRoute = BusRouteStore.getRoute(this.props.id);
    let stops = BusRouteStore.getStops(this.props.id);
    let locations = this.locationStore.getLocations();
    this.setState({busRoute, stops, locations});
  }

  render() {
    if(!this.state.busRoute) return null;

    let key = s => `${s.stopID}.${s.sequence}.${s.directionID}`;
    let stops = this.state.stops.map(s => <div key={key(s)}>{s.name}</div>);
    let time = this.state.locations.length > 0 ? this.state.locations[0].crossingTime : 'unknown';

    return (
      <div className="RouteDetails container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div>
              <h2>{this.state.busRoute.name}</h2>
              <span className="pull-right">Last updated: {time}</span>
            </div>
            {stops}
          </div>
          <div className="col-md-9">
            <RouteMap stops={this.state.stops} locations={this.state.locations} />
          </div>
        </div>
      </div>
    );
  }
}

export default RouteDetails;
