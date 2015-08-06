import React, { PropTypes } from 'react';
import styles from './Home.css';
import withStyles from '../../decorators/withStyles';
import RouteList from '../RouteList';

@withStyles(styles)
class Home {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = 'Home';
    this.context.onSetTitle(title);

    console.log(this.context);

    return (
      <div className="HomePage">
        <div className="HomePage-container">
          <h1>Welcome {title}</h1>

          <RouteList />

        </div>
      </div>
    );
  }
}

export default Home;
