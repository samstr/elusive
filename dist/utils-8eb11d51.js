'use strict';

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

exports.errorJson = errorJson;
exports.fieldErrors = fieldErrors;
exports.genericErrors = genericErrors;
