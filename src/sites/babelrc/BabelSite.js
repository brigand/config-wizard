import React from 'react';
import arrford from '../../utils/arrford';
import Button from '../../atoms/Button';
import Message from '../../atoms/Message';
import FinalMessage from './FinalMessage';
import PolyfillQuestion from './messages/PolyfillQuestion';
import PolyfillReply from './messages/PolyfillReply';
import {EDGES, FRAMEWORKS, BROWSERS} from './babelConstants';
import './BabelSite.css';

const LENGTHS = {
  LOCAL: 100,
  INTRO: 150,
  EDGE: 500,
  FRAMEWORK: 300,
  SUPPORT: 500,
  FINAL: 700,
  POLYFILL: 500,
};

const INITIAL_SUPPORT = {
  node: null,
  browsers: [],
};

export default
class BabelSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdgePrompt: false,
      edge: null,
      framework: null,
      support: INITIAL_SUPPORT,
      polyfill: null,
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
        {edge && this.renderFrameworksPrompt()}
        {(framework && framework !== FRAMEWORKS.get('nodePackage'))
          && this.renderBrowserSupportPrompt()
        }
        {(!!support.node || !!support.browsers.length) && this.renderBrowserSupportResponse()}
        {this.hasSupport() && this.renderPolyfillQuestion()}
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
          // determine if we need to reset support
          let {framework, support} = this.state;
          // we don't need the second half of this check, but I think it reads better
          // transition from node:
          if (framework === FRAMEWORKS.get('nodeApp') && id !== FRAMEWORKS.get('nodeApp')) {
            support = INITIAL_SUPPORT;
          }
          // transition to node:
          else if (framework !== FRAMEWORKS.get('nodeApp') && id === FRAMEWORKS.get('nodeApp')) {
            support = INITIAL_SUPPORT;
          }
          // transition to/from nodePackage
          else if (framework === FRAMEWORKS.get('nodePackage') || id === FRAMEWORKS.get('nodePackage')) {
            support = INITIAL_SUPPORT;
          }
          this.setState({framework: id, support: support});
        }}
      >{text}</Button>
    );
  }

  renderBrowserSupportPrompt() {
    const {framework, support} = this.state;
    if (framework === FRAMEWORKS.get('nodeApp')) {
      return (
        <Message remote length={LENGTHS.SUPPORT} key="browser-support-node">
          <p>
            {`What's the minimum Node.js version you need to support?`}
          </p>
          {[4, 5, 6, 7].map(version => (
            <Button
              key={version}
              active={support.node === version}
              onClick={() => this.setState({support: {...this.state.support, node: version}})}
            >
              {`v${version}.x.x`}
            </Button>
          ))}
        </Message>
      );
    }

    const hasSupport = key => support.browsers.includes(key);

    const toggleSupport = key => this.setState({
      support: {
        ...this.state.support,
        // adds or removes it from the array
        browsers: hasSupport(key)
          ? support.browsers.filter(x => x !== key)
          : support.browsers.concat([key]),
      },
    });

    const percentIds = BROWSERS.percents.map(x => x.value);
    const toggleSupportPercent = key => this.setState({
      support: {
        ...this.state.support,
        // adds or removes it from the array
        browsers: hasSupport(key)
          ? support.browsers.filter(x => x !== key)
          : support.browsers.filter(x => percentIds.indexOf(x) === -1).concat([key]),
      },
    });

    return (
      <Message remote length={LENGTHS.SUPPORT} key="browser-support-browser">
        <p>
          {`Supporting more browsers is great, but you can ship less code `}
          {`with potentially much better performance by only targetting newer browsers.`}
        </p>
        <p>
          {`What's your target support? You can select multiple options.`}
        </p>
        <div>
          {[BROWSERS.versions.map(({text, value}) => (
            <Button
              key={value}
              active={hasSupport(value)}
              onClick={() => toggleSupport(value)}
            >
              {text}
            </Button>
          ))]}
        </div>
        <p>
          {`Or perhaps you want to include browsers with a certain number of users?`}
        </p>
        <div>
          {[BROWSERS.percents.map(({text, value}) => (
            <Button
              key={value}
              active={hasSupport(value)}
              onClick={() => toggleSupportPercent(value)}
            >
              {text}
            </Button>
          ))]}
        </div>
      </Message>
    );
  }

  renderBrowserSupportResponse() {
    const {support} = this.state;
    const supportsPercent = support.browsers.find(value => /> \d+%/.test(value));
    const supportsOther = support.browsers.filter(value => /> \d+%/.test(value) === false);
    const supportsOtherCount = supportsOther.length;


    let text = '';
    if (support.node) {
      text = `I'm supporting node ${support.node}.x.x.`;
    } else if (supportsPercent && supportsOtherCount === 0){
      text = `I'm supporting browsers with usage ${supportsPercent}`;
    } else if (!supportsPercent && supportsOtherCount > 0) {
      text = `I'm supporting ${arrford(supportsOther)}`
    } else if (supportsPercent && supportsOtherCount > 0) {
      text = `I'm supporting browsers with usage ${supportsPercent}, plus ${arrford(supportsOther)}`;
    }

    return (
      <Message local length={LENGTHS.LOCAL} key={`browser-support-response/${text}`}>
        {text}
      </Message>
    );
  }

  hasSupport() {
    return !!(this.state.support.node || this.state.support.browsers.length);
  }

  shouldRenderFinal() {
    const {edge, framework, support: {node, browsers}, polyfill} = this.state;
    if (!edge) return false;
    if (!framework) return false;
    if (framework !== FRAMEWORKS.get('nodePackage') && !node && !browsers.length) return false;
    if (!polyfill) return false;
    return true;
  }

  renderPolyfillQuestion() {
    return (
      <Message length={LENGTHS.POLYFILL} key="polyfill-question">
        <PolyfillQuestion
          value={this.state.polyfill}
          onChange={polyfill => this.setState({polyfill})}
        />
      </Message>
    );
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
