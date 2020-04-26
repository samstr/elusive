class ElusiveClient {
  static instance;

  init = (options) => {
    this.options = options;
  };

  static getInstance() {
    if (ElusiveClient.instance) {
      return ElusiveClient.instance;
    }
    ElusiveClient.instance = new ElusiveClient();
    return ElusiveClient.instance;
  }
}

const Elusive = ElusiveClient.getInstance();

export default Elusive;
