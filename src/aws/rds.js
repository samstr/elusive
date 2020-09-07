import { Client } from 'pg';

export const WRITER = 'writer';
export const READER = 'reader';

class RDS {
  constructor(config = {}) {
    const {
      database,
      debug,
      password,
      port,
      readerHost,
      user,
      writerHost,
    } = config;

    if (database) {
      this.database = database;
    }

    if (debug) {
      this.debug = debug;
    }

    if (password) {
      this.password = password;
    }

    if (port) {
      this.port = port;
    }

    if (readerHost) {
      this.readerHost = readerHost;
    }

    if (user) {
      this.user = user;
    }

    if (writerHost) {
      this.writerHost = writerHost;
    }
  }

  connect(source) {
    if (!this.client) {
      this.source = source;

      if (this.debug) {
        console.log(`Connecting to ${this.source}`);
      }

      this.client = new Client({
        user: this.user,
        host: this.source === WRITER ? this.writerHost : this.readerHost,
        database: this.database,
        password: this.password,
        port: this.port,
      });

      this.client.connect();
    } else {
      if (this.debug) {
        console.log(`Client already exists (connected to ${this.source}`);
      }
    }
  }

  disconnect() {
    if (this.client) {
      if (this.debug) {
        console.log(`Disconnecting from ${this.source}: Done`);
      }

      this.client.end();
    } else {
      if (this.debug) {
        console.log(`No need to disconnect (no client connected)`);
      }
    }
  }

  async query(query, values) {
    if (this.debug) {
      console.log(
        `Query (${this.source}):`,
        query.replace('\n', '').replace(/\s+/g, ' '),
        values || []
      );
    }

    return this.client.query(query, values);
  }

  async transaction(fn) {
    try {
      if (this.debug) {
        console.log('Transaction: BEGIN');
      }

      await this.client.query('BEGIN');
      const data = await fn();

      if (this.debug) {
        console.log('Transaction: COMMIT');
      }

      await this.client.query('COMMIT');

      return data;
    } catch (err) {
      console.error('Error during transation', err);

      if (this.debug) {
        console.log('Transaction: ROLLBACK');
      }

      await this.client.query('ROLLBACK');

      return false;
    }
  }
}

export { RDS };
