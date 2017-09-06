import React, {PropTypes} from 'react';
import WritingIndicator from './WritingIndicator';
import './Message.css';

// keep in sync with Message.css
const EXPAND_DURATION = 300;

export default
class Message extends React.Component {
  static propTypes = {
    // provide one of these, they indicate if the message is to/from the user
    remote: PropTypes.bool,
    local: PropTypes.bool,

    // the message body
    children: PropTypes.any,

    // the time it takes to write the message
    length: PropTypes.number.isRequired,

    noScroll: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: true,
      height: null,
      firstRender: true,
      entering: false,
      didEnter: false,
    };
  }

  componentDidMount() {
    const height = getComputedStyle(this.contentEl).height;
    this.setState({height, firstRender: false});

    // flip the args for readability
    const timeout = (ms, f) => setTimeout(f, ms);

    this.setState({show: false});
    timeout(this.props.length || 0, () => {
      this.setState({show: true, entering: true}, () => {
        timeout(0, () => {
          this.setState({entering: false});
          timeout(EXPAND_DURATION, () => {
            this.setState({didEnter: true});
            if (!this.props.noScroll) {
              if (this.el.scrollIntoViewIfNeeded) {
                this.el.scrollIntoViewIfNeeded();
              } else {
                this.el.scrollIntoView();
              }
            }
          });
        });
      });
    });
  }

  render() {
    return (
      <div className={this.getClassName()} ref={(el) => this.el = el}>
        {this.renderContent()}
        {!this.state.show && this.renderLoading()}
        <div className="Message__arrow" />
      </div>
    );
  }

  getClassName() {
    const {remote, local} = this.props;
    let cn = 'Message';

    if (remote) {
      cn = `${cn} Message--remote`;
    } else if (local) {
      cn = `${cn} Message--local`;
    }

    return cn;
  }

  renderContent() {
    const {firstRender, show, entering, didEnter, height} = this.state;
    const style = {};

    if (!firstRender) {
      if (!show || entering) {
        style.maxHeight = '0';
        style.transform = `scale(0)`;
      } else if (show && !entering) {
        style.maxHeight = `${height}`;
        style.transform = `scale(1)`;
      }
    }

    if (didEnter) {
      style.maxHeight = 'auto';
    }

    return (
      <div className="Message__Content" style={style} ref={(el) => {
        this.contentEl = el;
      }}>
        <div className="Message__Content__Body">
          {this.props.children}
        </div>
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="Message__Loading">
        <WritingIndicator />
      </div>
    );
  }
}
