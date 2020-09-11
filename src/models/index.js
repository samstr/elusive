const camelCase = require('camelcase');

export class Model {
  constructor(data) {
    if (data) {
      Object.keys(data).map((key) => {
        this[camelCase(key)] = data[key];
      });
    }
  }
}
