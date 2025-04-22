import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { createPool } from "mysql2/promise";

import { env } from "~/env";
import * as schema from "./schema";
import type { Pool } from "mysql2";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
  promise: Promise<Pool> | undefined;
};

const conn = 
  globalForDb.conn ??
  createPool({
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASS,
    database: env.SINGLESTORE_DB,
    ssl: {}, 
    maxIdle: 0,
  });

if (env.NODE_ENV !== "production")  globalForDb.conn = conn;

conn.addListener("error", (err) => {
  console.error("Database connection error");
  throw err;
});

export const db = drizzle(conn, { schema });

