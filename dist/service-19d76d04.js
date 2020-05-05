'use strict';

var utils$2 = require('./utils-dbb053a5.js');

var COLLECTION = 'users';

var model = (function (data) {
  return utils$2.createModel(data);
});

var _createService = utils$2.createService(model, COLLECTION),
    getUser = _createService.getObject,
    createUser = _createService.createObject,
    updateUser = _createService.updateObject,
    listUsers = _createService.listObjects;

exports.COLLECTION = COLLECTION;
exports.createUser = createUser;
exports.getUser = getUser;
exports.listUsers = listUsers;
exports.model = model;
exports.updateUser = updateUser;
