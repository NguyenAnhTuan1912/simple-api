import dotenv from 'dotenv';

// Load all .env.*
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const AppSettings = {
  PORT: process.env.PORT || "7500"
}