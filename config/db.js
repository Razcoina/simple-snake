import mysql from "mysql2/promise";
import "dotenv/config";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_SOCKET, DB_DATABASE } =
  process.env;

// Make sure the database existe before doing anything else
export async function initDB() {
  if (!DB_DATABASE) {
    throw new Error("DB_DATABASE environment variable is not set");
  }

  try {
    const conn = await mysql.createConnection({
      host: DB_HOST || undefined,
      port: DB_PORT ? Number(DB_PORT) : undefined,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      socketPath: DB_SOCKET || undefined,
    });

    // Create the database if it doesn't exist
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);

    // Create the table if it doesn't exist
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`${DB_DATABASE}\`.highscores (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        score INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      )
    `);

    await conn.end();

    console.log(`Database "${DB_DATABASE}" initiated`);
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

// Database connection pool
export const pool = mysql.createPool({
  host: DB_HOST || undefined,
  port: DB_PORT ? Number(DB_PORT) : undefined,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  socketPath: DB_SOCKET || undefined,
  database: DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
