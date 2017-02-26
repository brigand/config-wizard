import React, {PropTypes} from 'react';
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
    const rcJson = JSON.stringify(rc, null, 2);

    const selectSelf = (e) => e.target.select();

    return (
      <div className="FinalMessage">
        <p>
          {`Now that that's all settled, here's your .babelrc`}
          <textarea readOnly value={rcJson} onClick={selectSelf} className="FinalMessage__RC"/>
          {`And you can install the dependencies with one of these commands`}
          <textarea readOnly value={`npm install --save-dev ${deps.join(' ')}`} onClick={selectSelf} />
          <textarea readOnly value={`yarn add --dev ${deps.join(' ')}`} onClick={selectSelf} />
        </p>
      </div>
    );
  }
}
