# Expense Tracker

An expense tracker application built with a Node.js backend using Express and MongoDB, and a React frontend. This application allows users to add, view, update, and delete transactions, and it calculates the total balance, income, and expenses.

## Features

- Add new transaction
- View transaction history
- View recent transactions
- Update existing transactions
- Delete transactions
- Calculate total balance, income, and expenses

## Technologies Used

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- cors

### Frontend

- Vite+React
- Tailwind CSS
- Axios





## Usage

1. Use the form to add new transactions by providing a description, amount, transaction type (debit or credit), and date.
2. View the total balance, income, and expenses.
3. View recent transactions, update or delete them as needed.

## API Endpoints

### Expense Routes

- `POST /expenses` - Add a new expense
- `GET /expenses` - Get all expenses
- `GET /expenses/recent` - Get the 5 most recent expenses
- `PUT /expenses/:id` - Update an expense by ID
- `DELETE /expenses/:id` - Delete an expense by ID


## Contribution


