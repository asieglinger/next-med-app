import { type Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";




import { env } from "~/env";




export default  defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  tablesFilter: ["next-med-app_*"],
  dbCredentials: {
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASS,
    database: env.SINGLESTORE_DB,
    ssl: {}, 
  },
});
