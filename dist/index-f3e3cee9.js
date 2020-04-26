'use strict';

var classCallCheck = require('./classCallCheck-d2bb402f.js');
var defineProperty = require('./defineProperty-ba7cd53d.js');
var getPrototypeOf = require('./getPrototypeOf-b5b03665.js');

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var BCRYPT_SALT_ROUNDS = 10;
var COOKIES_ACCESS_TOKEN_NAME = 'at';
var COOKIES_REFRESH_TOKEN_NAME = 'rt';
var COOKIES_USER_ID_NAME = 'uid';
var COOKIES_EXPIRY_MINS = 43800; // 1 month

var JWT_ACCESS_TOKEN_EXPIRY_MINS = 10;
var JWT_REFRESH_TOKEN_EXPIRY_MINS = 43800; // 1 month

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) getPrototypeOf._setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, getPrototypeOf._getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return getPrototypeOf._setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _createSuper(Derived) { return function () { var Super = getPrototypeOf._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct$1()) { var NewTarget = getPrototypeOf._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return getPrototypeOf._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ElusiveError = /*#__PURE__*/function (_Error) {
  getPrototypeOf._inherits(ElusiveError, _Error);

  var _super = _createSuper(ElusiveError);

  function ElusiveError() {
    classCallCheck._classCallCheck(this, ElusiveError);

    return _super.apply(this, arguments);
  }

  return ElusiveError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var MissingJWTSecretOptionError = /*#__PURE__*/function (_ElusiveError) {
  getPrototypeOf._inherits(MissingJWTSecretOptionError, _ElusiveError);

  var _super2 = _createSuper(MissingJWTSecretOptionError);

  function MissingJWTSecretOptionError() {
    classCallCheck._classCallCheck(this, MissingJWTSecretOptionError);

    return _super2.apply(this, arguments);
  }

  return MissingJWTSecretOptionError;
}(ElusiveError);

var ElusiveClient = /*#__PURE__*/function () {
  function ElusiveClient() {
    var _this = this;

    classCallCheck._classCallCheck(this, ElusiveClient);

    defineProperty._defineProperty(this, "setDefaultOptions", function () {
      _this.options = {
        sessions: {
          bcrypt: {
            saltRounds: BCRYPT_SALT_ROUNDS
          },
          cookies: {
            accessTokenName: COOKIES_ACCESS_TOKEN_NAME,
            expiryMins: COOKIES_EXPIRY_MINS,
            refreshTokenName: COOKIES_REFRESH_TOKEN_NAME,
            userIdName: COOKIES_USER_ID_NAME
          },
          jwt: {
            accessTokenExpiryMins: JWT_ACCESS_TOKEN_EXPIRY_MINS,
            refreshTokenExpiryMins: JWT_REFRESH_TOKEN_EXPIRY_MINS,
            secret: null
          }
        }
      };
    });

    defineProperty._defineProperty(this, "init", function (options) {
      _this.setDefaultOptions();

      var sessions = options.sessions;

      if (sessions) {
        var bcrypt = sessions.bcrypt,
            cookies = sessions.cookies,
            jwt = sessions.jwt;

        if (bcrypt) {
          var saltRounds = bcrypt.saltRounds;

          if (saltRounds) {
            _this.options.sessions.bcrypt.saltRounds = saltRounds;
          }
        }

        if (cookies) {
          var accessTokenName = cookies.accessTokenName,
              expiryMins = cookies.expiryMins,
              refreshTokenName = cookies.refreshTokenName,
              userIdName = cookies.userIdName;

          if (accessTokenName) {
            _this.options.sessions.cookies.accessTokenName = accessTokenName;
          }

          if (expiryMins) {
            _this.options.sessions.cookies.expiryMins = expiryMins;
          }

          if (refreshTokenName) {
            _this.options.sessions.cookies.refreshTokenName = refreshTokenName;
          }

          if (userIdName) {
            _this.options.sessions.cookies.userIdName = userIdName;
          }
        }

        if (jwt) {
          var accessTokenExpiryMins = jwt.accessTokenExpiryMins,
              refreshTokenExpiryMins = jwt.refreshTokenExpiryMins,
              secret = jwt.secret;

          if (accessTokenExpiryMins) {
            _this.options.sessions.jwt.accessTokenExpiryMins = accessTokenExpiryMins;
          }

          if (refreshTokenExpiryMins) {
            _this.options.sessions.jwt.refreshTokenExpiryMins = refreshTokenExpiryMins;
          }

          if (secret) {
            _this.options.sessions.jwt.secret = secret;
          } else {
            throw new MissingJWTSecretOptionError();
          }
        }
      }
    });
  }

  _createClass(ElusiveClient, null, [{
    key: "getInstance",
    value: function getInstance() {
      if (ElusiveClient.instance) {
        return ElusiveClient.instance;
      }

      ElusiveClient.instance = new ElusiveClient();
      return ElusiveClient.instance;
    }
  }]);

  return ElusiveClient;
}();

defineProperty._defineProperty(ElusiveClient, "instance", void 0);

exports.BCRYPT_SALT_ROUNDS = BCRYPT_SALT_ROUNDS;
exports.COOKIES_ACCESS_TOKEN_NAME = COOKIES_ACCESS_TOKEN_NAME;
exports.COOKIES_EXPIRY_MINS = COOKIES_EXPIRY_MINS;
exports.COOKIES_REFRESH_TOKEN_NAME = COOKIES_REFRESH_TOKEN_NAME;
exports.COOKIES_USER_ID_NAME = COOKIES_USER_ID_NAME;
exports.ElusiveClient = ElusiveClient;
exports.JWT_ACCESS_TOKEN_EXPIRY_MINS = JWT_ACCESS_TOKEN_EXPIRY_MINS;
exports.JWT_REFRESH_TOKEN_EXPIRY_MINS = JWT_REFRESH_TOKEN_EXPIRY_MINS;
