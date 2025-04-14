import express from 'express';
import Expense from '../models/expenseModel.js';
import { protect } from '../middleware/authMiddleware.js'; // Import the protect middleware

const router = express.Router();

// Get expenses for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }); // Filter by user ID
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add an expense for the logged-in user
router.post('/', protect, async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the request body
    console.log('User ID:', req.user._id); // Log the user ID from the token

    const newExpense = new Expense({
      ...req.body,
      user: req.user._id, // Associate the expense with the logged-in user
    });
    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error adding transaction:', error); // Log the error
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

// Update an expense
router.put('/:id', protect, async (req, res) => {
  try {
    const expenseUpdate = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // Ensure the expense belongs to the logged-in user
      { $set: req.body },
      { new: true }
    );
    if (!expenseUpdate) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json(expenseUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

// Delete an expense
router.delete('/:id', protect, async (req, res) => {
  try {
    const expenseDelete = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id, // Ensure the expense belongs to the logged-in user
    });
    if (!expenseDelete) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ message: 'Transaction Deleted Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// Get all expenses (Admin or public route, if needed)
router.get('/all', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
});

// Get few recent expenses
router.get('/recent', protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }) // Filter by user ID
      .limit(5)
      .sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve recent expenses' });
  }
});

export default router;