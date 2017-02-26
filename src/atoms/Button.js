import React, {PropTypes} from 'react';
import './Button.css';

export default class Button extends React.Component {
  static propTypes = {
    kind: PropTypes.oneOf(['primary', 'secondary']),
    active: PropTypes.bool,
    children: PropTypes.any.isRequired,
    type: PropTypes.oneOf(['button', 'submit']),
  };

  static defaultProps = {
    kind: 'primary',
    type: 'button',
  };

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
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
