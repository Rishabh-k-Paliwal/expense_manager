import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputForm from './components/InputForm';
import ShowRecentTransactions from './components/ShowRecentTransactions';
import Calculation from './components/Calculation';
import Footer from './components/Footer';
import SignIn from './components/signIn'; // Import Sign-In component
import SignUp from './components/signUp'; // Import Sign-Up component
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import UserExpenses from './components/UserExpenses'; // Import UserExpenses component

const App = () => {
  return (
    <Router>
      <div
        className="min-h-screen flex flex-col items-center relative"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-gray-800 opacity-90"></div>

        {/* Main content */}
        <div className="relative z-10 w-full max-w-6xl px-4 sm:px-8 py-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route path="/expenses" element={<ProtectedRoute><UserExpenses /></ProtectedRoute>} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    {/* Header */}
                    <header className="text-center mb-8">
                      <h1 className="font-title font-extrabold text-5xl text-gray-100">
                        <span className="text-[#FF5733]">Budget</span>
                        <span className="text-gray-100"> Tracker</span>
                      </h1>
                      <p className="text-gray-200 mt-2 text-lg">
                        Simplify your financial management with ease.
                      </p>
                    </header>

                    {/* Main sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Add Transaction Section */}
                      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-100 mb-4">
                          Add New Transaction
                        </h2>
                        <InputForm />
                      </div>

                      {/* Calculations Section */}
                      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-100 mb-4">
                          Summary
                        </h2>
                        <Calculation />
                      </div>

                      {/* Recent Transactions Section */}
                      <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-100 mb-4">
                          Recent Transactions
                        </h2>
                        <ShowRecentTransactions />
                      </div>
                    </div>
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;