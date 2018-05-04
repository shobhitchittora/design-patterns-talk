class Instance {
  constructor() {
    console.log('creating new');
  }
};

var module = (function () {
  var instance = null;

  function initialize() {
    return new Instance();
  };

  return {
    getInstance: function () {
      if (!instance) {
        instance = initialize();
      }
      return instance;
    }
  };
})();

const first = module.getInstance();
const second = module.getInstance();

console.log(first === second);