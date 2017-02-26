const presetRegex = /^babel-preset-(.+)$/g;
const pluginRegex = /^babel-plugin-(.+)$/g;

const normalize = (res) => {
  if (res.rc.presets.length === 0) delete res.rc.presets;
  if (res.rc.plugins.length === 0) delete res.rc.plugins;
  return res;
};

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
    return normalize({deps, rc});
  }

  return normalize({deps, rc});
};

export default computeBabelrcResult;
