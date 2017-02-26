import React, { Component } from 'react';
import Home from './sites/home/Home';
import BabelSite from './sites/babelrc/BabelSite';
import getCurrentSite from './utils/getCurrentSite';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: getCurrentSite(),
    }
  }
  render() {
    return (
      <div className="App">
        <h1 className="App__Header">
          {`Config Wizard:`} <strong className="App__Header__Site">{this.getTitle()}</strong>
        </h1>
        <a className="App__GH" href="https://github.com/brigand/config-wizard" target="_blank">
          View on Github
        </a>
        <div className="App__Content">
          {this.renderSite()}
        </div>
      </div>
    );
  }

  getTitle() {
    const {site} = this.state;
    if (site === null) {
      return 'Home';
    }
    if (site === 'babelrc') {
      return '.babelrc';
    }
    if (site === 'eslintrc') {
      return '.eslintrc';
    }
  }

  renderSite() {
    const {site} = this.state;
    if (site === null) {
      return <Home />
    }
    if (site === 'babelrc') {
      return <BabelSite />;
    }
    return <div>unknown site</div>;
  }
}

export default App;
