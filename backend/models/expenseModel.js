import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Description is required'], // Custom error message
      trim: true, // Removes extra spaces
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'], // Custom error message
      min: [0, 'Amount must be a positive number'], // Validation for positive numbers
    },
    category: {
      type: String,
      required: [true, 'Category is required'], // Custom error message
      trim: true, // Removes extra spaces
    },
    transactionType: {
      type: String,
      required: [true, 'Transaction type is required'], // Custom error message
      enum: ['credit', 'debit'], // Restrict to specific values
    },
    date: {
      type: Date,
      required: [true, 'Date is required'], // Custom error message
      default: Date.now, // Default to the current date
    },
    notes: {
      type: String,
      trim: true, // Removes extra spaces
      default: '', // Default to an empty string
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;