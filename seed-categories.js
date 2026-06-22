const fs = require('fs');
const { Pool } = require('pg');

const env = fs.readFileSync('.env', 'utf8');
const dbUrl = env.match(/DATABASE_URL=(.*)/)[1];

const pool = new Pool({ connectionString: dbUrl });

const sql = `
  INSERT INTO category (name, created_at) 
  VALUES 
    ('Nature', NOW()), 
    ('Technology', NOW()), 
    ('Art', NOW()) 
  ON CONFLICT (name) DO NOTHING;
`;

pool.query(sql)
  .then(() => {
    console.log('Categories seeded');
    process.exit(0);
  })
  .catch(e => {
    console.error('Error seeding categories:', e);
    process.exit(1);
  });
