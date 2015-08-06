import React, { PropTypes } from 'react';
import styles from './Home.css';
import withStyles from '../../decorators/withStyles';

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
          <p>...</p>
        </div>
      </div>
    );
  }
}

export default Home;
