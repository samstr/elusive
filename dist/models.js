'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('./classCallCheck-d2bb402f.js');

var camelCase = require('camelcase');

var Model = function Model(data) {
  var _this = this;

  classCallCheck._classCallCheck(this, Model);

  if (data) {
    Object.keys(data).map(function (key) {
      if (key.startsWith('_')) {
        _this["_".concat(camelCase(key))] = data[key];
      } else {
        _this[camelCase(key)] = data[key];
      }
    });
  }
};

exports.Model = Model;
