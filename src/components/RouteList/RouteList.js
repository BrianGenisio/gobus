import React, { PropTypes } from 'react';
import _ from 'lodash';
import styles from './RouteList.css';
import withStyles from '../../decorators/withStyles';
import BusRouteStore from '../../stores/BusRouteStore';
import RouteListItem from './RouteListItem';

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
    let routes = _.sortBy(this.state.busRoutes, r => parseInt(r.routeAbbr))
      .map(r => <RouteListItem key={r.routeOffsetID} busRoute={r} />);

    return (
      <div className="RouteList">
        RouteList
        {routes}
      </div>
    );
  }
}

export default RouteList;
