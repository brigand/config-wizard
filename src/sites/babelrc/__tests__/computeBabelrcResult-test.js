import f from '../computeBabelrcResult';

it('edge: bleeding', () => {
  const res = f({edge: 'bleeding', support: {browsers: ['> 1%']}});
  expect(res).toEqual({
    deps: ['babel-preset-env', 'babel-preset-stage-0'],
    rc: {
      presets: [
        ['env', {
          targets: {
            browsers: ['> 1%'],
          }
        }],
        'stage-0',
      ],
    },
  })
});

it('edge: safe, framework: nodeApp', () => {
  const res = f({edge: 'safe', framework: 'nodeApp', support: {node: 6}});
  expect(res).toEqual({
    deps: ['babel-preset-env'],
    rc: {
      presets: [
        ['env', {
          targets: {
            node: 6,
          }
        }],
      ],
    },
  })
});

const snapshots = [
  {edge: 'cutting', framework: 'react', support: {browsers: ['> 1%']}},
  {edge: 'cutting', framework: 'angular1', support: {browsers: ['> 1%']}},
  {edge: 'cutting', framework: 'angular2', support: {browsers: ['> 1%']}},
  {edge: 'cutting', framework: 'nodePackage', support: {browsers: [], node: null}},
  {edge: 'cutting', framework: 'none', support: {browsers: ['> 1%'], node: null}},
];

snapshots.forEach((opts) => {
  it(`edge: ${opts.edge}, framework: ${opts.framework}, support: ${JSON.stringify(opts.support)}`, () => {
    const res =f(opts);
    expect(res).toMatchSnapshot();
  });
});
