/*class ElusiveSingleton {
  static instance;

  constructor() {
    // your logic here
  }

  static getInstance() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = new Singleton();
    return Singleton.instance;
  }
}*/

class Elusive {}

Elusive.init = (options) => {
  Elusive.options = options;
};

export default Elusive;
