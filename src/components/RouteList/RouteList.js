import React, { PropTypes } from 'react';
import styles from './RouteList.css';
import withStyles from '../../decorators/withStyles';
import BusRouteStore from '../../stores/BusRouteStore';

@withStyles(styles)
class RouteList extends React.Component {

  constructor() {
    super();
    this.state = { busRoutes: [] };

    this._onStoreChange = () => this.getBusRoutes();
  }

  componentDidMount() {
    BusRouteStore.addListener('change', this._onStoreChange);
    this.getBusRoutes();
  }

  componentWillUnmount() {
    BusRouteStore.removeListener('change', this._onStoreChange);
  }

  getBusRoutes() {
    let busRoutes = BusRouteStore.getAll();
    this.setState({busRoutes});
  }

  render() {
    let routes = this.state.busRoutes.map(r => <div key={r.routeOffsetID}>{r.name}</div>);

    return (
      <div className="RouteList">
        RouteList
        {routes}
      </div>
    );
  }
}

export default RouteList;
