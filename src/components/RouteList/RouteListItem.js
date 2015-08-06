import React, { PropTypes } from 'react';
import Link from '../../utils/Link';

class RouteListItem {
  render() {
    let busRoute = this.props.busRoute;
    let routeRoute = `/routes/${busRoute.routeOffsetID}`;

    return (
      <div className="RouteListItem">
        <a href={routeRoute} onClick={Link.handleClick}>{busRoute.routeAbbr}: {busRoute.name}</a>
      </div>
    );
  }
}

export default RouteListItem;
