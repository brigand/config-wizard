import React, {PropTypes} from 'react';
import './JSONView.css';

export default
class JSONView extends React.Component {
  static propTypes = {
    string: PropTypes.string.isRequired,
  };

  render() {
    const tokens = getTokens(this.props.string);
    return (
      <pre className="JSONView">
        <code>
          {tokens.map((line, i) =>
            <span key={i}>
              {line.map((token, j) =>
                <span
                  key={j}
                  className={`JSONView__Token__${token.type}`}
                >
                  {token.value}
                </span>)
              }
              {'\n'}
            </span>
          )}
        </code>
      </pre>
    );
  }
}

export function getTokens(json) {
  let line = [];
  let buffer = '';
  let isNumber = false;
  let isString = false;

  const lines = [line];

  for (let i = 0; i < json.length; i++) {
    const c = json[i];
    if (c === '\n') {
      line = [];
      lines.push(line);
      buffer = '';
    } else if (isString) {
      if (c === '"') {
        isString = false;
        buffer += c;
        line.push({type: 'string', value: buffer});
        buffer = '';
      } else {
        buffer += c;
      }
    } else if (c === '"') {
      isString = true;
      buffer += c;
    } else if (isNumber) {
      buffer += c;
      if (!/[0-9.]/.test(json[i + 1])) {
        line.push({type: 'number', value: buffer});
        buffer = '';
        isNumber = false;
      }
    } else if (/[0-9.]/.test(c)) {
      isNumber = true;
      buffer += c;
    } else if (['{', '}', '[', ']', ':', ','].indexOf(c) !== -1) {
      line.push({type: 'op', value: c});
      buffer = '';
    } else if (json.slice(i, i + 4) === 'null') {
      line.push({type: 'null'});
      i += 4;
      buffer = '';
    } else if (c === ' ' || c === '\t') {
      buffer += c;
      if (json[i + 1] !== ' ' && json[i + 1] !== '\t') {
        line.push({type: 'whitespace', value: buffer});
        buffer = '';
      }
    }
  }
  return lines;
}
