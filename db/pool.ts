import { Pool } from 'pg';
require('dotenv').config();

export default new Pool({
  connectionString: process.env.PRODUCTION_DB,
});
