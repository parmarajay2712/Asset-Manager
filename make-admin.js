const fs = require('fs');
const { Pool } = require('pg');

const env = fs.readFileSync('.env', 'utf8');
const dbUrl = env.match(/DATABASE_URL=(.*)/)[1];

const pool = new Pool({ connectionString: dbUrl });

const sql = `
  UPDATE "user"
  SET role = 'admin'
  RETURNING id, name, email, role;
`;

pool.query(sql)
  .then((res) => {
    console.log(`Successfully updated ${res.rowCount} user(s) to admin!`);
    console.log(res.rows);
    process.exit(0);
  })
  .catch(e => {
    console.error('Error updating users:', e);
    process.exit(1);
  });
