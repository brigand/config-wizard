import React from 'react';
import Button from '../../atoms/Button';
import {EDGES} from './babelConstants';
import './BabelSite.css';

export default
class BabelSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edge: null,
    };
  }
  render() {
    return (
      <div className="BabelSite">
        <div className="BabelSite__Section">
          {this.renderEdgeButton(EDGES.ids.safe)}
          {this.renderEdgeButton(EDGES.ids.cutting)}
          {this.renderEdgeButton(EDGES.ids.bleeding)}
        </div>
      </div>
    );
  }

  renderEdgeButton(id) {
    const text = EDGES.texts[id];
    if (!text) {
      throw new Error(`Invalid edge id ${id}`);
    }
    return (
      <Button
        active={this.state.edge === id}
        onClick={() => {
          this.setState({edge: id});
        }}
      >{text}</Button>
    );
  }
}
