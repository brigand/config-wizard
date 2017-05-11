import {EDGES, FRAMEWORKS} from './babelConstants';
const presetRegex = /^babel-preset-(.+)$/g;
const pluginRegex = /^babel-plugin-(.+)$/g;

const normalize = (res) => {
  if (res.rc.presets.length === 0) delete res.rc.presets;
  if (res.rc.plugins.length === 0) delete res.rc.plugins;
  return res;
};

const computeBabelrcResult = ({edge, framework, support}) => {
  const deps = [];
  const rc = {
    plugins: [],
    presets: [],
  };

  const addDep = (name, version = undefined) => {
    if (deps.indexOf(name) === -1) {
      if (version) {
        deps.push(`${name}@${version}`);
      } else {
        deps.push(name);
      }
    }
    const shortName = name.replace(presetRegex, '$1').replace(pluginRegex, '$1');
    return shortName;
  };

  const getEnvConfig = () => {
    const preset = addDep('babel-preset-env');
    const config = {targets: {}};
    if (support.node) {
      config.targets.node = support.node;
    } else {
      config.targets.browsers = support.browsers;
    }
    return [preset, config];
  };

  // node packages should be compiled to ES5
  if (framework === FRAMEWORKS.get('nodePackage')) {
    rc.presets.push(addDep('babel-preset-latest'));
  } else {
    rc.presets.push(getEnvConfig());
  }

  // frameworks specific stuff
  if (framework === FRAMEWORKS.get('react')) {
    rc.presets.push(addDep('babel-preset-react'));
  }

  if (framework === FRAMEWORKS.get('angular1')) {
    if (edge === EDGES.get('cutting')) {
      rc.plugins.push(addDep('babel-plugin-transform-class-properties'));
    }
    rc.plugins.push(addDep('babel-plugin-angularjs-annotate', '^0.7.0'));
  }

  if (edge === EDGES.get('bleeding')) {
    rc.presets.push(addDep('babel-preset-stage-0'));
    return normalize({deps, rc});
  }

  if (edge === EDGES.get('cutting')) {
    if (framework === FRAMEWORKS.get('react')) {
      rc.plugins.push(addDep('babel-plugin-transform-class-properties'));
      rc.plugins.push(addDep('babel-plugin-transform-object-rest-spread'));
    }
    if (framework === FRAMEWORKS.get('angular2')) {
      rc.plugins.push(addDep('babel-plugin-transform-decorators'));
    }
  }

  return normalize({deps, rc});
};

export default computeBabelrcResult;
