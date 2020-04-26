'use strict';

var classCallCheck = require('./classCallCheck-d2bb402f.js');

/*class ElusiveSingleton {
  static instance;

  constructor() {
    // your logic here
  }

  static getInstance() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = new Singleton();
    return Singleton.instance;
  }
}*/
var Elusive = function Elusive() {
  classCallCheck._classCallCheck(this, Elusive);
};

Elusive.init = function (options) {
  Elusive.options = options;
};

module.exports = Elusive;
