import { sql } from "../config/db.js";

export async function initReport() {
     try {
    // await sql`DROP TABLE reports`
    await sql`
      CREATE TABLE IF NOT EXISTS reports(
      ticket VARCHAR(36) PRIMARY KEY, -- use UUID or short ID
      type VARCHAR(20) NOT NULL,
      message TEXT NOT NULL,
      url TEXT,
      status VARCHAR(20) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      `;

    console.log(`Report Table INITIALIZED SUCCESFULLY!!`);
  } catch (error) {
    console.log(`Error initializing Database: ${error}`);
    throw error;
  }
}