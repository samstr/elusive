'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = require('./classCallCheck-d2bb402f.js');
var camelCase = require('camelcase');
var moment = require('moment');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var camelCase__default = /*#__PURE__*/_interopDefaultLegacy(camelCase);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

var Model = function Model(data) {
  var _this = this;

  classCallCheck._classCallCheck(this, Model);

  if (data) {
    Object.keys(data).map(function (key) {
      var ccKey = camelCase__default['default'](key);

      if (key.startsWith('date_')) {
        _this[ccKey] = moment__default['default'](data[key]);
      } else {
        _this[ccKey] = data[key];
      }
    });
  }
};

exports.Model = Model;
