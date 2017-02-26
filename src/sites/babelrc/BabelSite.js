import React from 'react';
import Button from '../../atoms/Button';
import Message from '../../atoms/Message';
import FinalMessage from './FinalMessage';
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
        <Message key="intro" remote length={LENGTHS.INTRO}>
          <p>
            {`Welcome to the `}
            <strong>.babelrc</strong>
            {` config generator!`}
          </p>
          <p>
            {`I'll ask you some questions and get you a working config!`}
          </p>
        </Message>
        {this.state.showEdgePrompt && this.renderEdgePrompt()}
        {this.state.edge && this.showEdgeResponse()}
        {this.maybeRenderFinal()}
      </div>
    );
  }

  renderEdgePrompt() {
    return (
      <Message key="edge" remote length={LENGTHS.EDGE}>
        <p>
          {`Babel supports the latest standards, as well as proposed features to the language.`}
        </p>
        <p>
          {`Proposals can change at any time, but some are safer to use than others. `}
          {`They can improve your code, at the cost of taking on some risk. Feeling adventurous?`}
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

    return <Message key="edge-response" local>{text}</Message>;
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

  shouldRenderFinal() {
    if (this.state.edge === EDGES.ids.bleeding) return true;
    return false;
  }

  maybeRenderFinal() {
    if (!this.shouldRenderFinal()) {
      return null;
    }

    const data = {
      edge: this.state.edge,
    };

    return (
      <Message key="final" remote length={300}>
        <FinalMessage data={data} />
      </Message>
    );
  }
}
