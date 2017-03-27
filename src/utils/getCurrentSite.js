// @flow
const getCurrentSite = (): ?string => {
  const url = location.search.slice(1);
  if (url.indexOf('babelrc') === 0) {
    return 'babelrc';
  }

  if (url.indexOf('eslintrc') === 0) {
    return 'eslintrc';
  }

  return null;
};

module.exports = getCurrentSite;

