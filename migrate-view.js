const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    await pool.query(
      `ALTER TABLE asset ADD COLUMN IF NOT EXISTS view_count integer NOT NULL DEFAULT 0;`
    );
    console.log("Migration successful: Added view_count to asset table");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    pool.end();
  }
}

main();
