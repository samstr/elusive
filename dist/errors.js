'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var PropTypes = _interopDefault(require('prop-types'));
var React = require('react');
var React__default = _interopDefault(React);
var reactBootstrap = require('react-bootstrap');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var __jsx = React__default.createElement;

var GenericErrors = function GenericErrors(_ref) {
  var errors = _ref.errors;
  return __jsx(reactBootstrap.Alert, {
    variant: "danger"
  }, errors.map(function (error) {
    return __jsx("div", {
      key: error.name
    }, error.message);
  }));
};

GenericErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }))
};

var createErrorResponseArray = function createErrorResponseArray(errors) {
  return {
    errors: errors.map(function (err) {
      var obj = {
        name: err.name,
        message: err.message
      };

      if (err.fields) {
        obj.fields = err.fields;
      }

      return obj;
    })
  };
};
var genericErrors = function genericErrors(errors, includingFields) {
  if (!errors || !errors.length) return [];
  return errors.filter(function (err) {
    return !err.fields || err.fields && err.fields.length && includingFields && includingFields.length && err.fields.some(function (field) {
      return includingFields.includes(field);
    });
  });
};
var fieldErrors = function fieldErrors(errors, field) {
  if (!errors || !errors.length) return [];
  return errors.filter(function (err) {
    return err.fields && err.fields.length && err.fields.includes(field);
  });
};

var __jsx$1 = React__default.createElement;

var FormErrors = function FormErrors(_ref) {
  var errors = _ref.errors,
      field = _ref.field,
      includingFields = _ref.includingFields;

  // Errors for a specific form field
  if (field) {
    var _fieldErrors = fieldErrors(errors, field);

    if (!_fieldErrors.length) return null;
    return __jsx$1(reactBootstrap.Form.Control.Feedback, {
      type: "invalid"
    }, _fieldErrors.map(function (error) {
      return __jsx$1("div", {
        key: error.name
      }, error.message);
    }));
  } // Generic errors


  var _genericErrors = genericErrors(errors, includingFields);

  if (!_genericErrors.length) return null;
  return __jsx$1(GenericErrors, {
    errors: _genericErrors
  });
};

FormErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  })),
  field: PropTypes.string,
  includingFields: PropTypes.arrayOf(PropTypes.string)
};

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
exports.FormErrors = FormErrors;
exports.GenericErrors = GenericErrors;
exports.createErrorResponseArray = createErrorResponseArray;
exports.fieldErrors = fieldErrors;
exports.genericErrors = genericErrors;
