// import 'dotenv/config'
// import { drizzle } from "drizzle-orm/node-postgres"
// import pkg from "pg"

// const { Pool } = pkg

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL is not defined")
// }

// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// })

// export const db = drizzle(pool)
/**
 * Database configuration and initialization module.
 *
 * This module:
 * - Loads environment variables
 * - Creates a PostgreSQL connection pool
 * - Initializes Drizzle ORM instance
 *
 * @module db
 */

import 'dotenv/config'
import { drizzle } from "drizzle-orm/node-postgres"
import pkg from "pg"

const { Pool } = pkg

/**
 * Validate required environment variables.
 * @throws {Error} If DATABASE_URL is not defined
 */
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined")
}

/**
 * PostgreSQL connection pool instance.
 * @type {import('pg').Pool}
 */
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

/**
 * Drizzle ORM database instance.
 * Used for querying the database.
 */
export const db = drizzle(pool)