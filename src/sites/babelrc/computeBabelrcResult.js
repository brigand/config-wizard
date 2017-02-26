const presetRegex = /^babel-preset-(.+)$/g;
const pluginRegex = /^babel-plugin-(.+)$/g;

const computeBabelrcResult = ({edge}) => {
  const deps = [];
  const rc = {
    plugins: [],
    presets: [],
  };

  const addDep = (name) => {
    deps.push(name);
    const shortName = name.replace(presetRegex, '$1').replace(pluginRegex, '$1');
    return shortName;
  };

  if (edge === 'bleeding') {
    rc.presets.push(addDep('babel-preset-latest'));
    rc.presets.push(addDep('babel-preset-stage-0'));
    return {deps, rc};
  }

  return {deps, rc};
};

export default computeBabelrcResult;
