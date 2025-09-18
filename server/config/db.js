import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv"

dotenv.config();

const {PGHOST, PGDATABASE, PGUSER,PGPASSWORD} = process.env;

//Create a SQL connection With Neon

export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)