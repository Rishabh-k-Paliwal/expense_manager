import React, { useState, useEffect } from 'react';
import publicRequest from '../requestMethods';

const Calculation = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get('/expenses');
        const fetchedData = res.data;

        // Calculate income and expenses
        const totalIncome = fetchedData
          .filter((item) => item.transactionType === 'credit')
          .reduce((acc, curr) => acc + curr.amount, 0);

        const totalExpense = fetchedData
          .filter((item) => item.transactionType === 'debit')
          .reduce((acc, curr) => acc + curr.amount, 0);

        setIncome(totalIncome);
        setExpense(totalExpense);
        setTotal(totalIncome - totalExpense);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-gray-800 bg-opacity-50 backdrop-blur-md text-white items-center gap-6 py-8 rounded-lg shadow-lg px-8">
      <h1 className="text-3xl font-extrabold text-gray-100">Expense Tracker</h1>

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          {/* Total Balance */}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-sm text-gray-400">TOTAL BALANCE</h2>
            <h1
              className={`text-5xl font-bold ${
                total >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {total >= 0 ? `+₹${total}` : `-₹${Math.abs(total)}`}
            </h1>
          </div>

          {/* Income and Expenses */}
          <div className="flex justify-around w-full gap-6">
            {/* Income Card */}
            <div className="flex flex-col items-center bg-gray-700 bg-opacity-50 backdrop-blur-md rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-sm text-gray-400">INCOME</h2>
              <h1 className="text-3xl font-bold text-green-400">+₹{income}</h1>
            </div>

            {/* Expenses Card */}
            <div className="flex flex-col items-center bg-gray-700 bg-opacity-50 backdrop-blur-md rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-sm text-gray-400">EXPENSES</h2>
              <h1 className="text-3xl font-bold text-red-400">-₹{expense}</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Calculation;