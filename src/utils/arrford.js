/*
The MIT License (MIT)

Copyright (c) dawsonbotsford <dawsonbotsford@gmail.com> (dawsonbotsford.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

module.exports = function (input, oxford, join) {
  const argLength = arguments.length;

  if (typeof oxford === 'undefined') {
    oxford = true;
  }
  join = typeof join === 'undefined' ? 'and' : join;

  if (!Array.isArray(input)) {
    throw new TypeError(`Expected input to be an array, got ${typeof input}`);
  }
  if (typeof oxford !== 'boolean') {
    throw new TypeError(`Expected oxford to be a boolean, got ${typeof oxford}`);
  }
  if (typeof join !== 'string') {
    throw new TypeError(`Expected join to be a string, got ${typeof join}`);
  }

  const allStrings = input.every(curr => {
    return (typeof curr === 'string');
  });
  if (allStrings === false) {
    throw new Error(`Expected all elements of input array to be strings. Consider a map call to cast all elements to strings`);
  }

  if (argLength !== 1 && argLength !== 2 && argLength !== 3) {
    throw new Error(`Expected 1, 2 or 3 arguments, got ${argLength}`);
  }

  switch (input.length) {
    case 0: {
      return input;
    }
    case 1: {
      return input[0];
    }
    case 2: {
      return `${input[0]} ${join} ${input[1]}`;
    }
    default: {
      let returnString = input[0];
      for (let i = 1; i < input.length; i++) {
        if (i < input.length - 1) {
          returnString += `, ${input[i]}`;
        } else {
          returnString += oxford ? ',' : '';
          returnString += ` ${join} ${input[i]}`;
        }
      }
      return returnString;
    }
  }
};

