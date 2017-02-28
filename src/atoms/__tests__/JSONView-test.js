import {getTokens} from '../JSONView';

const example = {
  foo: {
    x: 1,
    y: null,
    z: 'test',
  },
};
const exampleStr = JSON.stringify(example, null, 2);

it(`getTokens doesn't error`, () => {
  const tokens = getTokens(exampleStr);
  expect(Array.isArray(tokens)).toBe(true);
});

it(`getTokens works for simple example`, () => {
  const json = JSON.stringify({x: 123});
  const tokens = getTokens(json);
  console.log(tokens[0])
  expect(tokens).toEqual([
    [
      {type: 'op', value: '{'},
      {type: 'string', value: '"x"'},
      {type: 'op', value: ':'},
      {type: 'number', value: '123'},
      {type: 'op', value: '}'},
    ]
  ]);
});

it(`getTokens works for large example`, () => {
  const tokens = getTokens(exampleStr);
  expect(tokens).toMatchSnapshot();
});
