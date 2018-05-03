class Instance {
  constructor() {
    console.log('creating new');
  }
};

var module = (function () {
  var instance = null;

  function init() {
    return new Instance();
  };

  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();

const first = module.getInstance();
const second = module.getInstance();

console.log(first === second);