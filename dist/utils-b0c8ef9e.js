'use strict';

var defineProperty$1 = require('./defineProperty-ba7cd53d.js');
var index$1 = require('./index.js');
var asyncToGenerator = require('./asyncToGenerator-093ecb8b.js');
var uuid = require('uuid');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty$1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
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
var createService = function createService(model, collectionName) {
  return {
    collection: function collection() {
      return _collection(collectionName);
    },
    getObjectByID: function () {
      var _getObjectByID2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(id) {
        return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _getObjectByID(model, collectionName, id));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getObjectByID(_x) {
        return _getObjectByID2.apply(this, arguments);
      }

      return getObjectByID;
    }(),
    getObject: function () {
      var _getObject2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee2(query) {
        return asyncToGenerator.regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", _getObject(model, query));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getObject(_x2) {
        return _getObject2.apply(this, arguments);
      }

      return getObject;
    }(),
    createObject: function () {
      var _createObject2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee3(createProps) {
        return asyncToGenerator.regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", _createObject(model, collectionName, createProps));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createObject(_x3) {
        return _createObject2.apply(this, arguments);
      }

      return createObject;
    }(),
    updateObject: function () {
      var _updateObject2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee4(doc, updateProps) {
        return asyncToGenerator.regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", _updateObject(model, collectionName, doc, updateProps));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updateObject(_x4, _x5) {
        return _updateObject2.apply(this, arguments);
      }

      return updateObject;
    }(),
    listObjects: function () {
      var _listObjects2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee5(query) {
        return asyncToGenerator.regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _listObjects(model, query));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function listObjects(_x6) {
        return _listObjects2.apply(this, arguments);
      }

      return listObjects;
    }()
  };
};

var _collection = function _collection(collectionName) {
  var firebase = index$1.services.firebase;
  var firestore = firebase.firestore();
  return firestore.collection(collectionName);
};

var _createObject = /*#__PURE__*/function () {
  var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee6(model, collectionName, createProps) {
    var firebase, firestore, id, dateNow, doc;
    return asyncToGenerator.regenerator.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            firebase = index$1.services.firebase;
            firestore = firebase.firestore();
            id = uuid.v4();
            dateNow = firebase.firestore.Timestamp.now();
            doc = _objectSpread(_objectSpread({}, createProps), {}, {
              dateCreated: dateNow,
              dateUpdated: dateNow
            });
            _context6.next = 7;
            return firestore.collection(collectionName).doc(id).set(doc);

          case 7:
            return _context6.abrupt("return", model(_objectSpread(_objectSpread({}, doc), {}, {
              id: id
            })));

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function _createObject(_x7, _x8, _x9) {
    return _ref.apply(this, arguments);
  };
}();

var _getObjectByID = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee7(model, collectionName, id) {
    var firebase, firestore, doc;
    return asyncToGenerator.regenerator.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            firebase = index$1.services.firebase;
            firestore = firebase.firestore();
            _context7.next = 4;
            return firestore.collection(collectionName).doc(id).get();

          case 4:
            doc = _context7.sent;

            if (!doc.exists) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt("return", model(_objectSpread({
              id: doc.id
            }, doc.data())));

          case 9:
            return _context7.abrupt("return", null);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function _getObjectByID(_x10, _x11, _x12) {
    return _ref2.apply(this, arguments);
  };
}();

var _getObject = /*#__PURE__*/function () {
  var _ref3 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee8(model, query) {
    var docs, object;
    return asyncToGenerator.regenerator.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            query.limit(1);
            _context8.next = 3;
            return query.get();

          case 3:
            docs = _context8.sent;
            docs.forEach(function (doc) {
              object = model(_objectSpread({
                id: doc.id
              }, doc.data()));
            });
            return _context8.abrupt("return", object);

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function _getObject(_x13, _x14) {
    return _ref3.apply(this, arguments);
  };
}();

var _updateObject = /*#__PURE__*/function () {
  var _ref4 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee9(model, collectionName, doc, updateProps) {
    var firebase, firestore, newDoc;
    return asyncToGenerator.regenerator.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            firebase = index$1.services.firebase;
            firestore = firebase.firestore();
            updateProps.dateUpdated = firebase.firestore.Timestamp.now();
            newDoc = _objectSpread(_objectSpread({}, doc), updateProps);
            _context9.next = 6;
            return firestore.collection(collectionName).doc(doc.id).update(updateProps);

          case 6:
            return _context9.abrupt("return", model(newDoc));

          case 7:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function _updateObject(_x15, _x16, _x17, _x18) {
    return _ref4.apply(this, arguments);
  };
}();

var _listObjects = /*#__PURE__*/function () {
  var _ref5 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee10(model, query) {
    var docs, objects;
    return asyncToGenerator.regenerator.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return query.get();

          case 2:
            docs = _context10.sent;
            objects = [];
            docs.forEach(function (doc) {
              objects.push(model(_objectSpread({
                id: doc.id
              }, doc.data())));
            });
            return _context10.abrupt("return", objects);

          case 6:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function _listObjects(_x19, _x20) {
    return _ref5.apply(this, arguments);
  };
}();

exports._collection = _collection;
exports._createObject = _createObject;
exports._getObject = _getObject;
exports._getObjectByID = _getObjectByID;
exports._listObjects = _listObjects;
exports._updateObject = _updateObject;
exports.createModel = createModel;
exports.createService = createService;
