import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';     
import router from './routes/expenseRoutes.js';
dotenv.config({ path: 'C:/Users/HP/ReactLearn/Project1/p1/Expense-Tracker-main/Expense-Tracker-main/backend/.env' }); // Explicit path if needed

const app = express();

// Debugging environment variables
console.log('MONGODB_CONNECTION:', process.env.MONGODB_CONNECTION);
console.log('PORT:', process.env.PORT);

// MIDDLEWARES
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use('/expenses', router);

// DB CONNECTION
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log('DB CONNECTED SUCCESSFULLY');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// SERVER LISTENING
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});