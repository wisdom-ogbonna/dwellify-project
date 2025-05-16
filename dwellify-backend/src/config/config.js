import dotenv from 'dotenv';
dotenv.config();

export const config = {
  termiiApiKey: process.env.TERMII_API_KEY,
  port: process.env.PORT,
};
