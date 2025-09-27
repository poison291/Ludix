import { sql } from "../config/db.js";

export async function initUsersTable() {
 
      try {
        const users = await sql`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE  NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
        )
        `
         console.log(`USERS Table INITIALIZED SUCCESFULLY!!`);
      } catch (error) {
        console.log(`Error while Creating user Table ${error}`)
      }


}