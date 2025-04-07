import React, { useState } from 'react';
import publicRequest from '../requestMethods';

const InputForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    transactionType: '',
    date: '',
    notes: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await publicRequest.post('/expenses', formData);
      setSuccessMessage('Transaction added successfully!');
      setFormData({
        description: '',
        amount: '',
        category: '',
        transactionType: '',
        date: '',
        notes: '',
      });
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to add transaction. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-100 mb-4 text-center">
          Add New Transaction
        </h2>

        {/* Success Message */}
        {successMessage && (
          <div className="text-green-400 text-sm font-medium mb-4">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-400 text-sm font-medium mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Description Input */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Amount Input */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300"
            >
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              step="0.01"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300"
            >
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Transaction Type Radio Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Transaction Type
            </label>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="transactionType"
                  value="debit"
                  checked={formData.transactionType === 'debit'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
                  required
                />
                <label
                  htmlFor="transactionType"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Debit
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="transactionType"
                  value="credit"
                  checked={formData.transactionType === 'credit'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
                  required
                />
                <label
                  htmlFor="transactionType"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Credit
                </label>
              </div>
            </div>
          </div>

          {/* Date Input */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-300"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Notes Input */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-300"
            >
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional notes"
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;