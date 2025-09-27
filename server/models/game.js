import { sql } from "../config/db.js";


export async function initGamesTable() {
  try {
    // await sql`DROP TABLE games`
    await sql`
      CREATE TABLE IF NOT EXISTS games(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
      image TEXT NOT NULL,
      categories TEXT[] NOT NULL,
      description TEXT NOT NULL,
      stock INT DEFAULT 0 CHECK (stock >= 0),
      visible BOOLEAN DEFAULT true,
      platforms TEXT[] NOT NULL,
      tags TEXT[] NOT NULL,
      release_date VARCHAR(100) NOT NULL,
      developer VARCHAR(255) NOT NULL,
      publisher VARCHAR(255) NOT NULL,
      rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      `;

    console.log(`Game Table INITIALIZED SUCCESFULLY!!`);
  } catch (error) {
    console.log(`Error initializing Database: ${error}`);
    throw error;
  }
}
