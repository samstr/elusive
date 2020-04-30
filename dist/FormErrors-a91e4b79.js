'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var wrapNativeSuper = require('./wrapNativeSuper-b3646a2a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reactBootstrap = require('react-bootstrap');

function _createSuper(Derived) { return function () { var Super = wrapNativeSuper._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = wrapNativeSuper._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return wrapNativeSuper._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var BaseError = /*#__PURE__*/function (_Error) {
  wrapNativeSuper._inherits(BaseError, _Error);

  var _super = _createSuper(BaseError);

  function BaseError() {
    wrapNativeSuper._classCallCheck(this, BaseError);

    return _super.apply(this, arguments);
  }

  return BaseError;
}( /*#__PURE__*/wrapNativeSuper._wrapNativeSuper(Error));

var __jsx = React__default.createElement;

var GenericErrors = function GenericErrors(_ref) {
  var errors = _ref.errors;
  return __jsx(reactBootstrap.Alert, {
    variant: "danger"
  }, errors.map(function (error) {
    return __jsx("div", {
      key: error.message
    }, error.message);
  }));
};

GenericErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.string)
  }))
};

var errorJson = function errorJson(errors) {
  if (Array.isArray(errors)) {
    return {
      errors: errors.map(function (err) {
        var obj = {
          message: err.message
        };

        if (err.fields) {
          obj.fields = err.fields;
        }

        return obj;
      })
    };
  } else {
    return {
      errors: [{
        message: errors.message
      }]
    };
  }
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
        key: error.message
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
    message: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.string)
  })),
  field: PropTypes.string,
  includingFields: PropTypes.arrayOf(PropTypes.string)
};

exports.BaseError = BaseError;
exports.FormErrors = FormErrors;
exports.GenericErrors = GenericErrors;
exports.errorJson = errorJson;
exports.fieldErrors = fieldErrors;
exports.genericErrors = genericErrors;
