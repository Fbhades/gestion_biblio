import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
});

try {
  pool.query('SELECT NOW()').then(() => {
    console.log('Connected to database successfully!');
  }).catch((err) => {
    console.error('Error connecting to database:', err);
    // Handle connection error (e.g., stop app or retry)
  });
} catch (error) {
  console.error('Error creating database pool:', error);
  // Handle pool creation error (e.g., stop app)
}

export default pool;
