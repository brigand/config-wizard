import React from 'react';
import Button from '../../atoms/Button';
import Message from '../../atoms/Message';
import {EDGES} from './babelConstants';
import './BabelSite.css';

const LENGTHS = {
  INTRO: 500,
  EDGE: 1000,
};

export default
class BabelSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdgePrompt: false,
      edge: null,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({showEdgePrompt: true});
    }, LENGTHS.INTRO + 500);
  }

  render() {
    return (
      <div className="BabelSite">
        <Message remote length={LENGTHS.INTRO}>
          <p>
            {`Welcome to the `}
            <strong>.babelrc</strong>
            {` config generator!`}
          </p>
          <p>
            {`I'll ask you some questions and get you a working config ASAP!`}
          </p>
        </Message>
        {this.state.showEdgePrompt && this.renderEdgePrompt()}
        {this.state.edge && this.showEdgeResponse()}
      </div>
    );
  }

  renderEdgePrompt() {
    return (
      <Message remote length={LENGTHS.EDGE}>
        <p>
          {``}
        </p>
        {this.renderEdgeButton(EDGES.ids.safe)}
        {this.renderEdgeButton(EDGES.ids.cutting)}
        {this.renderEdgeButton(EDGES.ids.bleeding)}
      </Message>
    );
  }

  showEdgeResponse() {
    const {edge} = this.state;
    let text = '';

    if (edge === EDGES.ids.safe) {
      text = `I only want to use final features to avoid rewriting code if they change or go away.`;
    } else if (edge === EDGES.ids.cutting) {
      text = `There are features that seem stable and provide good benefits to my code; I'll use those.`;
    } else if (edge === EDGES.ids.bleeding) {
      text = `I'll just use the proposals I want without having to mess with the config.`;
    }

    return <Message local>{text}</Message>;
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
