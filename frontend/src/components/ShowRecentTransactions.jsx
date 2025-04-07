import React, { useState, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import publicRequest from '../requestMethods';

const ShowRecentTransactions = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    transactionType: '',
    date: '',
    notes: '',
  });
  const [expandedNotes, setExpandedNotes] = useState({}); // Track expanded notes

  // Fetch recent transactions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await publicRequest.get('/expenses');
        setRecentTransactions(res.data);
      } catch (error) {
        console.error('Error fetching recent transactions:', error);
      }
    };
    fetchData();
  }, []);

  // Handle delete transaction
  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/expenses/${id}`);
      setRecentTransactions(recentTransactions.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Handle edit transaction
  const handleEdit = (transaction) => {
    setEditingTransactionId(transaction._id);
    setFormData({
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      transactionType: transaction.transactionType,
      date: transaction.date.split('T')[0], // Format date for input
      notes: transaction.notes,
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.put(`/expenses/${editingTransactionId}`, formData);
      setEditingTransactionId(null);
      const res = await publicRequest.get('/expenses');
      setRecentTransactions(res.data);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  // Handle closing the update form
  const handleCloseUpdate = () => {
    setEditingTransactionId(null);
  };

  // Toggle expanded notes
  const toggleExpandedNotes = (id) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col gap-3 px-4 sm:px-8 py-6 rounded-xl bg-gray-900 text-gray-200 shadow-lg">
      <h2 className="font-semibold px-3 text-gray-100 text-[16px] text-base sm:text-lg">
        Recent Transactions
      </h2>
      <div className="overflow-y-auto max-h-[500px] pr-2"> {/* Scrollable container */}
        {recentTransactions.map((item) => (
          <div
            key={item._id}
            className="flex flex-col gap-3 bg-gray-800 px-3 sm:px-5 py-3 rounded-lg border border-gray-700 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h3 className="font-medium text-gray-100">{item.description}</h3>
                <h4 className="text-xs text-gray-400">
                  {new Date(item.date).toLocaleDateString()}
                </h4>
                <p className="text-sm text-gray-300">Category: {item.category}</p>
                <p className="text-sm text-gray-300">
                  Notes:{' '}
                  {expandedNotes[item._id] ? (
                    <>
                      {item.notes}{' '}
                      <button
                        onClick={() => toggleExpandedNotes(item._id)}
                        className="text-blue-400 hover:underline"
                      >
                        Show Less
                      </button>
                    </>
                  ) : (
                    <>
                      {item.notes.slice(0, 50)}
                      {item.notes.length > 50 && (
                        <button
                          onClick={() => toggleExpandedNotes(item._id)}
                          className="text-blue-400 hover:underline"
                        >
                          ...Read More
                        </button>
                      )}
                    </>
                  )}
                </p>
              </div>
              <div className="flex gap-1 sm:gap-4">
                {item.transactionType === 'debit' ? (
                  <h3 className="font-semibold text-lg text-red-400">
                    -₹{item.amount}
                  </h3>
                ) : (
                  <h3 className="font-semibold text-lg text-green-400">
                    +₹{item.amount}
                  </h3>
                )}
                <button onClick={() => handleEdit(item)}>
                  <MdEdit className="border-2 h-6 w-6 p-1 rounded-md text-blue-400 border-blue-400" />
                </button>
                <button onClick={() => handleDelete(item._id)}>
                  <MdDelete className="border-2 h-6 w-6 p-1 rounded-md text-red-400 border-red-400" />
                </button>
              </div>
            </div>
            {editingTransactionId === item._id && (
              <form
                className="py-4 px-8 flex flex-col gap-4 bg-gray-800 rounded-xl shadow-2xl"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-300"
                  >
                    Description
                  </label>
                  <input
                    className="px-2 py-1 outline-none rounded-md text-md border border-gray-600 bg-gray-700 text-gray-200"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="amount"
                    className="text-sm font-medium text-gray-300"
                  >
                    Amount
                  </label>
                  <input
                    className="px-2 py-1 outline-none rounded-md text-md border border-gray-600 bg-gray-700 text-gray-200"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    step="0.01"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-300"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="px-2 py-1 outline-none rounded-md text-md border border-gray-600 bg-gray-700 text-gray-200"
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
                <div className="flex gap-4">
                  <div className="flex gap-1 justify-center items-center">
                    <input
                      className="scale-105 outline-none rounded-md text-md"
                      type="radio"
                      name="transactionType"
                      value="debit"
                      checked={formData.transactionType === 'debit'}
                      onChange={handleChange}
                      required
                    />
                    <label
                      htmlFor="transactionType"
                      className="text-sm font-medium text-gray-300"
                    >
                      Debit
                    </label>
                  </div>
                  <div className="flex gap-1 justify-center items-center">
                    <input
                      className="scale-105 outline-none rounded-md text-md"
                      type="radio"
                      name="transactionType"
                      value="credit"
                      checked={formData.transactionType === 'credit'}
                      onChange={handleChange}
                      required
                    />
                    <label
                      htmlFor="transactionType"
                      className="text-sm font-medium text-gray-300"
                    >
                      Credit
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="date"
                    className="text-sm font-medium text-gray-300"
                  >
                    Date
                  </label>
                  <input
                    className="px-2 py-1 outline-none rounded-md text-md border border-gray-600 bg-gray-700 text-gray-200"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="notes"
                    className="text-sm font-medium text-gray-300"
                  >
                    Notes
                  </label>
                  <textarea
                    className="px-2 py-1 outline-none rounded-md text-md border border-gray-600 bg-gray-700 text-gray-200 resize-y"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Add any additional notes"
                  ></textarea>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 rounded-md py-2 px-4 text-white font-title hover:bg-blue-700 transition duration-200"
                  >
                    Update Transaction
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseUpdate}
                    className="bg-red-600 rounded-md py-2 px-4 text-white font-title hover:bg-red-700 transition duration-200"
                  >
                    Close
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowRecentTransactions;