import React, { PropTypes } from 'react';
import styles from './RouteDetails.css';
import withStyles from '../../decorators/withStyles';
import BusRouteStore from '../../stores/BusRouteStore';

@withStyles(styles)
class RouteDetails extends React.Component {

  constructor() {
    super();
    this.state = {
      busRoute: {
        name: "loading"
      }
    };

    this._onStoreChange = () => this.getBusRoute();
  }

  componentDidMount() {
    BusRouteStore.addListener('change', this._onStoreChange);
    this.getBusRoute();
  }

  componentWillUnmount() {
    BusRouteStore.removeListener('change', this._onStoreChange);
  }

  getBusRoute() {
    let busRoute = BusRouteStore.get(this.props.id);
    if(busRoute) {
      this.setState({busRoute});
    }
  }

  render() {
    return (
      <div className="RouteDetails">
        <h2>Route Details</h2>
        Name: {this.state.busRoute.name}
      </div>
    );
  }
}

export default RouteDetails;
