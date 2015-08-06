import React, { PropTypes } from 'react';
import styles from './RouteDetails.css';
import withStyles from '../../decorators/withStyles';
import BusRouteStore from '../../stores/BusRouteStore';
import RouteMap from '../RouteMap';

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

    let stops = this.state.stops.map(s => <div key={s.sequence}>{s.name}</div>);

    return (
      <div className="RouteDetails container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2>{this.state.busRoute.name}</h2>
            {stops}
          </div>
          <div className="col-md-9">
            <RouteMap stops={this.state.stops} />
          </div>
        </div>




      </div>
    );
  }
}

export default RouteDetails;
