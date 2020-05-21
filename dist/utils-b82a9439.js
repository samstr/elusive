'use strict';

var randomInt = function randomInt(min, max) {
  var _min = Math.ceil(min);

  var _max = Math.floor(max);

  return Math.floor(Math.random() * (_max - _min + 1)) + _min;
};

exports.randomInt = randomInt;
