'use strict';

var classCallCheck = require('./classCallCheck-d2bb402f.js');

var BaseError = function BaseError(props) {
  classCallCheck._classCallCheck(this, BaseError);

  if (props && props.message) {
    this.message = props.message;
  }

  if (props && props.fields) {
    this.fields = props.fields;
  }
};

exports.BaseError = BaseError;
