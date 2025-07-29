import pool from './db';

const MAX_REQUESTS_PER_MINUTE = 10;

export async function checkRateLimit(ip) {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS request_counts (
        ip_address VARCHAR(255) PRIMARY KEY,
        count INTEGER NOT NULL,
        last_request_timestamp TIMESTAMP NOT NULL
      );
    `);

    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60000);

    const { rows } = await pool.query(
      'SELECT count, last_request_timestamp FROM request_counts WHERE ip_address = $1',
      [ip]
    );

    if (rows.length === 0) {
      await pool.query(
        'INSERT INTO request_counts (ip_address, count, last_request_timestamp) VALUES ($1, 1, $2)',
        [ip, now]
      );
      return true;
    }

    const { count, last_request_timestamp } = rows[0];

    if (last_request_timestamp < oneMinuteAgo) {
      await pool.query(
        'UPDATE request_counts SET count = 1, last_request_timestamp = $1 WHERE ip_address = $2',
        [now, ip]
      );
      return true;
    }

    if (count >= MAX_REQUESTS_PER_MINUTE) {
      return false;
    }

    await pool.query(
      'UPDATE request_counts SET count = count + 1, last_request_timestamp = $1 WHERE ip_address = $2',
      [now, ip]
    );
    return true;
  } catch (error) {
    console.error('Rate limit error:', error);
    // In case of a database error, allow the request to proceed.
    return true;
  }
}
