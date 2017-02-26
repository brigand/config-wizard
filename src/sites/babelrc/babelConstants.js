// babelConstants

const addHelpers = (obj) => {
  const keys = Object.keys(obj.texts || obj.ids);
  obj.enum = keys;
  obj.ids = keys.reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {});
  return obj;
};

export const EDGES = addHelpers({
  texts: {
    safe: 'Play it safe',
    cutting: 'Cutting edge',
    bleeding: 'Bleeding Edge',
  },
});
