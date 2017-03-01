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

export const BROWSERS = {
  versions: [
    {text: 'IE9', value: 'ie 9'},
    {text: 'IE10', value: 'ie 10'},
    {text: 'IE11', value: 'ie 11'},
    {text: 'iOS', value: 'last 2 iOS versions'},
    {text: 'Safari', value: 'last 3 Safari versions'},
    {text: 'FF LTS', value: 'Firefox ESR'},
    {text: 'Chrome', value: 'last 2 Chrome versions'},
    {text: 'Firefox', value: 'last 2 Firefox versions'},
  ],
  percents: [
    {text: '>1%', value: '> 1%'},
    {text: '>3%', value: '> 3%'},
    {text: '>5%', value: '> 5%'},
    {text: '>10%', value: '> 10%'},
  ],
};
