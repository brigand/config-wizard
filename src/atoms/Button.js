import React, {PropTypes} from 'react';
import './Button.css';

export default class Button extends React.Component {
  static propTypes = {
    kind: PropTypes.oneOf(['primary', 'secondary']),
    active: PropTypes.bool,
    children: PropTypes.any.isRequired,
    type: PropTypes.oneOf(['button', 'submit']),
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  static defaultProps = {
    kind: 'primary',
    type: 'button',
  };

  handleClick(e) {
    // defocus the button if it was active for better UX
    if (this.props.active) {
      e.currentTarget.blur();
    }
    this.props.onClick();
  }

  render() {
    let className = 'Button';
    className = `${className} Button--${this.props.kind}`;
    if (this.props.active) {
      className = `${className} Button--active`;
    }
    return (
      <button
        className={className}
        type={this.props.type}
        onClick={this.handleClick}
      >
        {this.props.children}
      </button>
    );
  }
}
