import 'core-js/es6/promise';

export default function loadPolyfills() {
  const fillFetch = () => new Promise(resolve => {
    if (window.fetch != undefined) return resolve();
    require.ensure([], () => {
      require('whatwg-fetch');
      resolve();
    }, 'fetch');
  });

  const fillRemove = () => new Promise(resolve => {
    if ([Element, CharacterData, DocumentType].some(function(o) {
      return o.prototype.remove != undefined;
    })) return resolve();
    require.ensure([], () => {
      require('./polyfills/remove');
      resolve();
    }, 'remove');
  });

  const fillAssign = () => new Promise(resolve => {
    if (Object.assign != undefined) return resolve();
    require.ensure([], () => {
      require('core-js/fn/object/assign');
      resolve();
    }, 'assign');
  });

  return Promise.all([
    fillFetch(),
    fillRemove(),
    fillAssign()
  ]);
}
