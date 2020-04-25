'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var BaseError = function BaseError(props) {
  _classCallCheck(this, BaseError);

  if (props && props.message) {
    this.message = props.message;
  }

  if (props && props.fields) {
    this.fields = props.fields;
  }
};

exports.BaseError = BaseError;
exports._classCallCheck = _classCallCheck;
