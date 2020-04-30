'use strict';

function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}

exports._readOnlyError = _readOnlyError;
