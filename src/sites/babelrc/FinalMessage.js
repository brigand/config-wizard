import React, {PropTypes} from 'react';
import JSONView from '../../atoms/JSONView';
import computeBabelrcResult from './computeBabelrcResult';
import './FinalMessage.css';

export default
class FinalMessage extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      edge: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const {data} = this.props;

    const {rc, deps} = computeBabelrcResult(data);

    const selectSelf = (e) => {
      const el = e.currentTarget;
      if (document.selection) {
        const range = document.body.createTextRange();
        range.moveToElementText(el);
        range.select();
      } else if (window.getSelection) {
        const range = document.createRange();
        range.selectNode(el);
        window.getSelection().addRange(range);
      }
    }

    return (
      <div className="FinalMessage">
        <div>
          {`Now that that's all settled, here's your .babelrc`}
          <div onClick={selectSelf}>
            <JSONView string={JSON.stringify(rc, null, 2)} />
          </div>
          {`And you can install the dependencies with one of these commands`}
          <div className="FinalMessage__Command">
            <code onClick={selectSelf}>
              {`npm install --save-dev ${deps.join(' ')}`}
            </code>
          </div>
          <div className="FinalMessage__Command">
            <code className="FinalMessage__Command" onClick={selectSelf}>
              {`yarn add --dev ${deps.join(' ')}`}
            </code>
          </div>
        </div>
      </div>
    );
  }
}
