import React from 'react';
import Button from '../../atoms/Button';
import Message from '../../atoms/Message';
import FinalMessage from './FinalMessage';
import {EDGES, FRAMEWORKS} from './babelConstants';
import './BabelSite.css';

const LENGTHS = {
  LOCAL: 100,
  INTRO: 150,
  EDGE: 500,
  FRAMEWORK: 300,
  SUPPORT: 500,
  FINAL: 700,
};

export default
class BabelSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdgePrompt: false,
      edge: null,
      framework: null,
      support: {},
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({showEdgePrompt: true});
    }, LENGTHS.INTRO + 500);
  }

  render() {
    const {edge, showEdgePrompt, framework, support} = this.state;
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
        {showEdgePrompt && this.renderEdgePrompt()}
        {edge && this.showEdgeResponse()}
        {edge && edge !== EDGES.get('safe') && this.renderFrameworksPrompt()}
        {(framework || edge === EDGES.get('safe')) && this.renderBrowserSupportPrompt()}
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

    return <Message local length={LENGTHS.LOCAL} key={`edge-response-${edge}`}>{text}</Message>;
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

  renderFrameworksPrompt() {
    const {framework} = this.state;
    return (
      <Message remote length={LENGTHS.FRAMEWORK} key="framework">
        <p>
          {`Different frameworks and situations have different conventions, including the experimental features `}
          {`they use.`}
        </p>
        <p>
          {`Any of these match what you're using?`}
        </p>
        <div>
          <div>
            {this.renderFrameworksButton(FRAMEWORKS.get('react'))}
            {this.renderFrameworksButton(FRAMEWORKS.get('angular1'))}
            {this.renderFrameworksButton(FRAMEWORKS.get('angular2'))}
          </div>
          <div>
            {this.renderFrameworksButton(FRAMEWORKS.get('nodePackage'))}
            {this.renderFrameworksButton(FRAMEWORKS.get('nodeApp'))}
          </div>
          <div>
            {this.renderFrameworksButton(FRAMEWORKS.get('none'))}
          </div>
        </div>
      </Message>
    );
  }

  renderFrameworksButton(id) {
    const text = FRAMEWORKS.texts[id];
    if (!text) {
      throw new Error(`Invalid framework id ${id}`);
    }
    return (
      <Button
        active={this.state.framework === id}
        onClick={() => {
          this.setState({framework: id});
        }}
      >{text}</Button>
    );
  }

  renderBrowserSupportPrompt() {
    const {support} = this.state;
    return (
      <Message remote length={LENGTHS.SUPPORT}>
        browser support
      </Message>
    );
  }

  shouldRenderFinal() {
    if (this.state.framework) return true;
    return false;
  }

  maybeRenderFinal() {
    if (!this.shouldRenderFinal()) {
      return null;
    }

    const data = {
      edge: this.state.edge,
      framework: this.state.framework,
      support: this.state.support,
    };

    return (
      <Message key="final" remote length={LENGTHS.FINAL}>
        <FinalMessage data={data} />
      </Message>
    );
  }
}
