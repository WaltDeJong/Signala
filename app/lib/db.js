import { Pool } from 'pg';
import { env } from './env';

let pool;

if (process.env.NODE_ENV === 'development') {
  if (!global._pgPool) {
    global._pgPool = new Pool({
      connectionString: env.POSTGRES_URL,
    });
  }
  pool = global._pgPool;
} else {
  pool = new Pool({
    connectionString: env.POSTGRES_URL,
  });
}

export default pool;
