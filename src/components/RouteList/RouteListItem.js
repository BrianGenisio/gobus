import React, { PropTypes } from 'react';

class RouteListItem {
  render() {
    return (
      <div className="RouteListItem">
        {this.props.busRoute.routeAbbr}: {this.props.busRoute.name}
      </div>
    );
  }
}

export default RouteListItem;
