'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var classCallCheck = require('../classCallCheck-d2bb402f.js');
require('../index-26463b7f.js');
var index = require('../index.js');
var FormErrors = require('../FormErrors-1539c4dc.js');
require('react');
require('prop-types');
require('react-bootstrap');
var index$1 = require('../index-2340470f.js');
require('uuid');
var utils = require('../utils-4521964b.js');
var users = require('./users.js');
var moment = _interopDefault(require('moment'));

function _createSuper(Derived) { return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var COLLECTION = 'passwordResets';
var model = function model(data) {
  var model = utils.createModel(data);

  model.hasExpired = function () {
    return passwordResetExpired(model);
  };

  model.getUser = function _callee() {
    return index$1._regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return index$1._regeneratorRuntime.awrap(users.getUser(model.userId));

          case 2:
            model.user = _context.sent;

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, null, Promise);
  };

  return model;
};

var _createService = utils.createService(model, COLLECTION),
    passwordResetsCollection = _createService.collection,
    getPasswordResetByID = _createService.getObjectByID,
    getPasswordReset = _createService.getObject,
    createPasswordReset = _createService.createObject,
    updatePasswordReset = _createService.updateObject,
    listPasswordResets = _createService.listObjects;
var PasswordResetAlreadyUsedError = /*#__PURE__*/function (_BaseError) {
  FormErrors._inherits(PasswordResetAlreadyUsedError, _BaseError);

  var _super = _createSuper(PasswordResetAlreadyUsedError);

  function PasswordResetAlreadyUsedError() {
    classCallCheck._classCallCheck(this, PasswordResetAlreadyUsedError);

    return _super.apply(this, arguments);
  }

  return PasswordResetAlreadyUsedError;
}(FormErrors.BaseError);
var PasswordResetExpiredError = /*#__PURE__*/function (_BaseError2) {
  FormErrors._inherits(PasswordResetExpiredError, _BaseError2);

  var _super2 = _createSuper(PasswordResetExpiredError);

  function PasswordResetExpiredError() {
    classCallCheck._classCallCheck(this, PasswordResetExpiredError);

    return _super2.apply(this, arguments);
  }

  return PasswordResetExpiredError;
}(FormErrors.BaseError);
var PasswordResetNotFoundError = /*#__PURE__*/function (_BaseError3) {
  FormErrors._inherits(PasswordResetNotFoundError, _BaseError3);

  var _super3 = _createSuper(PasswordResetNotFoundError);

  function PasswordResetNotFoundError() {
    classCallCheck._classCallCheck(this, PasswordResetNotFoundError);

    return _super3.apply(this, arguments);
  }

  return PasswordResetNotFoundError;
}(FormErrors.BaseError);
var passwordResetExpired = function passwordResetExpired(passwordReset) {
  var authOptions = index.options.auth;
  var dateNow = moment();
  var dateCreated = moment.unix(passwordReset.dateCreated);
  var dateExpires = moment(dateCreated).add(authOptions.resetPasswordExpiryHours, 'hours');
  return dateNow.isAfter(dateExpires);
};
/* export const getPasswordResetsByIPSinceDate = async (ip, date) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();

  const docs = await firestore
    .collection(COLLECTION)
    .where('ip', '==', ip)
    .where('dateCreated', '>', date)
    .get();

  const objects = [];

  docs.forEach((doc) => {
    objects.push(
      model({
        id: doc.id,
        ...doc.data(),
      })
    );
  });

  return objects;
};

export const sendPasswordResetRequestEmail = async (
  req,
  toEmail,
  passwordResetId
) => {
  const { mail: mailOptions } = Elusive.options;
  const dynamicTemplateData = defaultDynamicTemplateData(req);

  toEmail = 'samstr@gmail.com';

  return await sendMail({
    to: toEmail,
    from: {
      email: mailOptions.fromEmail,
      name: mailOptions.fromName,
    },
    template_id: mailOptions.resetPasswordRequestTemplateId,
    dynamic_template_data: {
      ...dynamicTemplateData,
      resetPasswordConfirmUrl: `${dynamicTemplateData.baseUrl}/reset/${passwordResetId}`,
    },
  });
};
*/

exports.PasswordResetAlreadyUsedError = PasswordResetAlreadyUsedError;
exports.PasswordResetExpiredError = PasswordResetExpiredError;
exports.PasswordResetNotFoundError = PasswordResetNotFoundError;
exports.createPasswordReset = createPasswordReset;
exports.getPasswordReset = getPasswordReset;
exports.getPasswordResetByID = getPasswordResetByID;
exports.listPasswordResets = listPasswordResets;
exports.model = model;
exports.passwordResetExpired = passwordResetExpired;
exports.passwordResetsCollection = passwordResetsCollection;
exports.updatePasswordReset = updatePasswordReset;
