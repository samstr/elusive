'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('../../classCallCheck-d2bb402f.js');
require('../../ElusiveClient-d044fa81.js');
var defineProperty$1 = require('../../defineProperty-ba7cd53d.js');
var index$1 = require('../../index.js');
var asyncToGenerator = require('../../asyncToGenerator-7a28bf2e.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty$1._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var modelData = function modelData(data) {
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

var createDocument = /*#__PURE__*/function () {
  var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(collectionRef, data) {
    var firebase, id, docRef, dateNow, doc;
    return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            firebase = index$1.services.firebase;
            id = collectionRef.doc().id;
            docRef = collectionRef.doc(id);
            dateNow = firebase.firestore.Timestamp.now();
            doc = _objectSpread(_objectSpread({}, data), {}, {
              dateCreated: dateNow,
              dateUpdated: dateNow
            });
            _context.next = 7;
            return docRef.set(doc);

          case 7:
            return _context.abrupt("return", modelData(_objectSpread(_objectSpread({}, doc), {}, {
              id: id
            })));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createDocument(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getDocument = /*#__PURE__*/function () {
  var _ref2 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee2(docRefOrQuery) {
    var firebase, docRef, doc, query, results, _doc;

    return asyncToGenerator.regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            firebase = index$1.services.firebase;

            if (!(docRefOrQuery instanceof firebase.firestore.DocumentReference)) {
              _context2.next = 13;
              break;
            }

            docRef = docRefOrQuery;
            _context2.next = 5;
            return docRef.get();

          case 5:
            doc = _context2.sent;

            if (!doc.exists) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", modelData(_objectSpread({
              id: doc.id
            }, doc.data())));

          case 10:
            return _context2.abrupt("return", null);

          case 11:
            _context2.next = 20;
            break;

          case 13:
            if (!(docRefOrQuery instanceof firebase.firestore.Query)) {
              _context2.next = 20;
              break;
            }

            query = docRefOrQuery.limit(1);
            _context2.next = 17;
            return query.get();

          case 17:
            results = _context2.sent;
            results.forEach(function (result) {
              _doc = modelData(_objectSpread({
                id: result.id
              }, result.data()));
            });
            return _context2.abrupt("return", _doc || null);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getDocument(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var updateDocument = /*#__PURE__*/function () {
  var _ref3 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee3(docRef, data, originalDoc) {
    var firebase, updatedDoc;
    return asyncToGenerator.regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            firebase = index$1.services.firebase;
            data.dateUpdated = firebase.firestore.Timestamp.now();
            updatedDoc = _objectSpread(_objectSpread({}, originalDoc), data);
            _context3.next = 5;
            return docRef.update(data);

          case 5:
            if (!originalDoc) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", modelData(updatedDoc));

          case 9:
            return _context3.abrupt("return", true);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateDocument(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var listDocuments = /*#__PURE__*/function () {
  var _ref4 = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee4(query) {
    var results, docs;
    return asyncToGenerator.regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return query.get();

          case 2:
            results = _context4.sent;
            docs = [];
            results.forEach(function (result) {
              docs.push(modelData(_objectSpread({
                id: result.id
              }, result.data())));
            });
            return _context4.abrupt("return", docs);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function listDocuments(_x7) {
    return _ref4.apply(this, arguments);
  };
}(); // TODO: delete

exports.createDocument = createDocument;
exports.getDocument = getDocument;
exports.listDocuments = listDocuments;
exports.updateDocument = updateDocument;
