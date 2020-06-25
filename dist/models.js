'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
require('./ElusiveClient-d044fa81.js');
var defineProperty$1 = require('./defineProperty-ba7cd53d.js');
var index$1 = require('./index.js');
var asyncToGenerator = require('./asyncToGenerator-7a28bf2e.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty$1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var model = function model(data) {
  var iterate = function iterate(obj) {
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == 'object' && obj[property] !== null) {
          // It's a firestore Timestamp just return the timestamp (seconds)
          if (typeof obj[property].seconds === 'number' && typeof obj[property].nanoseconds === 'number' && obj[property].seconds) {
            obj[property] = obj[property].seconds;
          } else if (typeof obj[property]._seconds === 'number' && typeof obj[property]._nanoseconds === 'number' && obj[property]._seconds) {
            obj[property] = obj[property]._seconds;
          } else {
            iterate(obj[property]);
          }
        }
      }
    }
  };

  iterate(data);
  return data;
};
var id = /*#__PURE__*/function () {
  var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(collectionRef) {
    var ref;
    return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ref = collectionRef.doc();
            return _context.abrupt("return", ref.id);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function id(_x) {
    return _ref.apply(this, arguments);
  };
}();
var create = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee2(docRef, createProps) {
    var firebase, dateNow, doc;
    return asyncToGenerator.regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            firebase = index$1.services.firebase;
            dateNow = firebase.firestore.Timestamp.now();
            doc = _objectSpread(_objectSpread({}, createProps), {}, {
              dateCreated: dateNow,
              dateUpdated: dateNow
            });
            _context2.next = 5;
            return docRef.set(doc);

          case 5:
            return _context2.abrupt("return", model(_objectSpread(_objectSpread({}, doc), {}, {
              id: id
            })));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function create(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var get = /*#__PURE__*/function () {
  var _ref3 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee3(query) {
    var docs, object;
    return asyncToGenerator.regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            query = query.limit(1);
            _context3.next = 3;
            return query.get();

          case 3:
            docs = _context3.sent;
            docs.forEach(function (doc) {
              object = model(_objectSpread({
                id: doc.id
              }, doc.data()));
            });
            return _context3.abrupt("return", object);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function get(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
var update = /*#__PURE__*/function () {
  var _ref4 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee4(docRef, data) {
    var firebase, newDoc;
    return asyncToGenerator.regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            firebase = index$1.services.firebase;
            data.dateUpdated = firebase.firestore.Timestamp.now();
            newDoc = _objectSpread(_objectSpread({}, doc), updateProps);
            _context4.next = 5;
            return docRef.update(data);

          case 5:
            return _context4.abrupt("return", model(newDoc));

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function update(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
var list = /*#__PURE__*/function () {
  var _ref5 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee5(query) {
    var docs, objects;
    return asyncToGenerator.regenerator.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return query.get();

          case 2:
            docs = _context5.sent;
            objects = [];
            docs.forEach(function (doc) {
              objects.push(model(_objectSpread({
                id: doc.id
              }, doc.data())));
            });
            return _context5.abrupt("return", objects);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function list(_x7) {
    return _ref5.apply(this, arguments);
  };
}(); // TODO: delete

exports.create = create;
exports.get = get;
exports.id = id;
exports.list = list;
exports.model = model;
exports.update = update;
