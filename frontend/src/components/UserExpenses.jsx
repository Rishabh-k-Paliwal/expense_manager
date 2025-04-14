import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Get user info from localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`, // Send token in headers
          },
        };

        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/expenses`, config);
        setExpenses(data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Expenses</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id} className="mb-2">
            <strong>{expense.description}</strong>: ${expense.amount} ({expense.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserExpenses;