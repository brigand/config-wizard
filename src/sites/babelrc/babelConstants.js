// babelConstants

const addHelpers = (obj) => {
  const keys = Object.keys(obj.texts || obj.ids);
  obj.enum = keys;
  obj.ids = keys.reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {});
  obj.get = (id) => {
    const value = obj.ids[id];
    if (!value) {
      throw new TypeError(`Invalid id ${id} expected one of ${Object.keys(obj.ids)}`);
    }
    return value;
  }
  return obj;
};

export const EDGES = addHelpers({
  texts: {
    safe: 'Play it safe',
    cutting: 'Cutting edge',
    bleeding: 'Bleeding Edge',
  },
});

export const FRAMEWORKS = addHelpers({
  texts: {
    react: 'React.js',
    angular1: 'Angular 1.x',
    angular2: 'Angular 2+',
    nodePackage: 'Node.js Package',
    nodeApp: 'Node.js App',
    none: 'None/Other',
  },
})
