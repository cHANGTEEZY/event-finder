import { Pool } from "pg";
import config from "./config.ts";

const pool = new Pool({
  connectionString: config.databaseUrl,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
