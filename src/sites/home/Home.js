import React from 'react';
import './Home.css';

export default
class Home extends React.Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="Home">
        {`Welcome to the config wizard. Chose a config type:`}
        <ul className="Home__List">
          <li className="Home__Item">
            <a href="?babelrc">babelrc</a>
          </li>
        </ul>
      </div>
    );
  }
}
