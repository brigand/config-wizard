// @flow
import React, { Component } from 'react';
import Home from './sites/home/Home';
import BabelSite from './sites/babelrc/BabelSite';
import getCurrentSite from './utils/getCurrentSite';
import './App.css';

class App extends Component {
  state: {
    site: ?string,
  };
  constructor(props: {}) {
    super(props);
    this.state = {
      site: getCurrentSite(),
    }
  }

  componentDidMount() {
    document.title = `${this.getTitle()} - Config Wizard`;
  }

  render() {
    return (
      <div className="App">
        {this.getTitle() === 'Home' &&
          <h1 className="App__Header">
            {`Config Wizard:`} <strong className="App__Header__Site">{this.getTitle()}</strong>
          </h1>
        }
        <a className="App__GH" href="https://github.com/brigand/config-wizard" target="_blank">
          View on Github
        </a>
        <div className="App__Content">
          {this.renderSite()}
        </div>
      </div>
    );
  }

  getTitle(): string {
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
    return '';
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
