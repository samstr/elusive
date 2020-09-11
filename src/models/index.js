const camelCase = require('camelcase');

export class Model {
  constructor(data) {
    if (data) {
      Object.keys(data).map((key) => {
        if (key.startsWith('_')) {
          this[`_${camelCase(key)}`] = data[key];
        } else {
          this[camelCase(key)] = data[key];
        }
      });
    }
  }
}
