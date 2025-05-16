import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import homeRoutes from './src/routes/home.routes.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('PORT is not defined in .env file');
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', homeRoutes);
app.use('/api/auth', authRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
