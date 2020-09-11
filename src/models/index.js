import camelCase from 'camelcase';
import moment from 'moment';

export class Model {
  constructor(data) {
    if (data) {
      Object.keys(data).map((key) => {
        const ccKey = camelCase(key);
        if (key.startsWith('date_')) {
          this[ccKey] = moment(data[key]);
        } else {
          this[ccKey] = data[key];
        }
      });
    }
  }
}
