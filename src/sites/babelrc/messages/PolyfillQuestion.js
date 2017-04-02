import React from 'react';
import Button from '../../../atoms/Button';
import {POLYFILLS} from '../babelConstants';

const message1 = `Babel transforms syntax (like arrow functions) to ES5, but you may need polyfills for APIs (like array.find).`;

const message2 = `Babel can automatically detect features your code uses (but not third party code), or you can include all of the polyfills to be safe, or I can generate a polyfill config based on your selections above.`;

function renderButton(id, text, value, onChange) {
  const active = id === value;
  return (
    <Button
      active={active}
      onClick={() => {
        if (value !== id) {
          onChange(id);
        }
      }}
    >
      {text}
    </Button>
  );
}

const PolyfillQuestion = ({value, onChange}) => {
  return (
    <div>
      <p>{message1}</p>
      <p>{message2}</p>
      <p>
        {renderButton(
          POLYFILLS.get('none'),
          POLYFILLS.texts[POLYFILLS.get('none')],
          value,
          onChange,
        )}
        {renderButton(
          POLYFILLS.get('detect'),
          POLYFILLS.texts[POLYFILLS.get('detect')],
          value,
          onChange,
        )}
        {renderButton(
          POLYFILLS.get('everything'),
          POLYFILLS.texts[POLYFILLS.get('everything')],
          value,
          onChange,
        )}
        {renderButton(
          POLYFILLS.get('guess'),
          POLYFILLS.texts[POLYFILLS.get('guess')],
          value,
          onChange,
        )}
      </p>
    </div>
  );
};

export default PolyfillQuestion;
