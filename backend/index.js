import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import expenseRoutes from './routes/expenseRoutes.js'; // Expense routes
import authRoutes from './routes/authRoutes.js'; // User authentication routes

dotenv.config({ path: 'C:/Users/HP/ReactLearn/Project1/p1/Expense-Tracker-main/Expense-Tracker-main/backend/.env' }); // Explicit path if needed

const app = express();

// Debugging environment variables
console.log('MONGODB_CONNECTION:', process.env.MONGODB_CONNECTION);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('PORT:', process.env.PORT);

// MIDDLEWARES
app.use(
  cors({
    origin: ['http://localhost:5173'], // Frontend origin
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON requests

// ROUTES
app.use('/expenses', expenseRoutes); // Expense-related routes
app.use('/api/auth', authRoutes); // User authentication routes

// DB CONNECTION
mongoose
  .connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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