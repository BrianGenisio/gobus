import React, { PropTypes } from 'react';
import styles from './RouteList.css';
import withStyles from '../../decorators/withStyles';
import BusRouteStore from '../../stores/BusRouteStore';

@withStyles(styles)
class RouteList extends React.Component {

  constructor() {
    super();

    this.state = { routes: [] };
  }

  componentDidMount() {
    BusRouteStore.getAll().then(routes => this.setState({routes}));
  }

  render() {
    let routes = (this.state.routes || []).map(r => <div key={r.routeOffsetID}>{r.name}</div>);

    return (
      <div className="RouteList">
        RouteList
        {routes}
      </div>
    );
  }
}

export default RouteList;
