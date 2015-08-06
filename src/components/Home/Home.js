import React, { PropTypes } from 'react';
import styles from './Home.css';
import withStyles from '../../decorators/withStyles';
import RouteList from '../RouteList';
import Link from '../../utils/Link';

@withStyles(styles)
class Home {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = 'GoBus';
    this.context.onSetTitle(title);

    console.log(this.context);

    return (
      <div className="HomePage">
        <div className="HomePage-container">
          <h1>Welcome to {title}</h1>

          <a href="/routes" onClick={Link.handleClick}>See the routes!</a>

        </div>
      </div>
    );
  }
}

export default Home;
