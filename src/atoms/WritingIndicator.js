import React from 'react';
import './WritingIndicator.css';

export default
class WritingIndicator extends React.Component {
  render() {
    return (
      <div className="WritingIndicator">
        <div className="WritingIndicator__Dot WritingIndicator__Dot--first"></div>
        <div className="WritingIndicator__Dot WritingIndicator__Dot--second"></div>
        <div className="WritingIndicator__Dot WritingIndicator__Dot--third"></div>
      </div>
    );
  }
}
