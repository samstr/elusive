'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var defineProperty = require('./defineProperty-ba7cd53d.js');
var index$1 = require('./index-2340470f.js');
var admin = _interopDefault(require('firebase-admin'));
var uuid = require('uuid');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var createModel = function createModel(data) {
  var model = {};
  Object.keys(data).forEach(function (key) {
    // It's a firestore Timestamp just return the timestamp (seconds)
    if (data[key].seconds) {
      model[key] = data[key].seconds;
    } else {
      model[key] = data[key];
    }
  });
  return model;
};
var createService = function createService(firestore, model, collection) {
  return {
    getObject: function getObject(id) {
      return index$1._regeneratorRuntime.async(function getObject$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", _getObject(firestore, model, collection, id));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, null, Promise);
    },
    createObject: function createObject(createProps) {
      return index$1._regeneratorRuntime.async(function createObject$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", _createObject(firestore, model, collection, createProps));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, null, Promise);
    },
    updateObject: function updateObject(doc, updateProps) {
      return index$1._regeneratorRuntime.async(function updateObject$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", _updateObject(firestore, model, collection, doc, updateProps));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, null, Promise);
    },
    listObjects: function listObjects() {
      return index$1._regeneratorRuntime.async(function listObjects$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", _listObjects(firestore, model, collection));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, null, Promise);
    }
  };
};

var _createObject = function _createObject(firestore, model, collection, createProps) {
  var id, dateNow, doc;
  return index$1._regeneratorRuntime.async(function _createObject$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = uuid.v4();
          dateNow = admin.firestore.Timestamp.now();
          doc = _objectSpread({}, createProps, {
            dateCreated: dateNow,
            dateUpdated: dateNow
          });
          _context5.next = 5;
          return index$1._regeneratorRuntime.awrap(firestore.collection(collection).doc(id).set(doc));

        case 5:
          return _context5.abrupt("return", model(_objectSpread({}, doc, {
            id: id
          })));

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, null, Promise);
};

var _getObject = function _getObject(firestore, model, collection, id) {
  var doc;
  return index$1._regeneratorRuntime.async(function _getObject$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return index$1._regeneratorRuntime.awrap(firestore.collection(collection).doc(id).get());

        case 2:
          doc = _context6.sent;

          if (!doc.exists) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", model(_objectSpread({
            id: doc.id
          }, doc.data())));

        case 7:
          return _context6.abrupt("return", null);

        case 8:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, null, Promise);
};

var _updateObject = function _updateObject(firestore, model, collection, doc, updateProps) {
  var newDoc;
  return index$1._regeneratorRuntime.async(function _updateObject$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          updateProps.dateUpdated = admin.firestore.Timestamp.now();
          newDoc = _objectSpread({}, doc, {}, updateProps);
          _context7.next = 4;
          return index$1._regeneratorRuntime.awrap(firestore.collection(collection).doc(doc.id).update(updateProps));

        case 4:
          return _context7.abrupt("return", model(newDoc));

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, null, Promise);
};

var _listObjects = function _listObjects(firestore, model, collection) {
  var docs, objects;
  return index$1._regeneratorRuntime.async(function _listObjects$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return index$1._regeneratorRuntime.awrap(firestore.collection(collection).get());

        case 2:
          docs = _context8.sent;
          objects = [];
          docs.forEach(function (doc) {
            objects.push(model(_objectSpread({
              id: doc.id
            }, doc.data())));
          });
          return _context8.abrupt("return", objects);

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, null, Promise);
};

exports.createModel = createModel;
exports.createObject = _createObject;
exports.createService = createService;
exports.getObject = _getObject;
exports.listObjects = _listObjects;
exports.updateObject = _updateObject;
