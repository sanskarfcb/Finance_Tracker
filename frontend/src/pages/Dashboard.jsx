import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import Analytics from './Analytics';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [newTxn, setNewTxn] = useState({
    title: '',
    amount: '',
    type: 'EXPENSE',
    category: '',
    date: ''
  });

  const fetchSummary = async () => {
    try {
      const res = await API.get('/transaction/summary');
      setSummary(res.data);
    } catch (err) {
      alert("Session expired. Please login again.");
      navigate('/');
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await API.get('/transaction');
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/transaction/${id}`);
      fetchTransactions();
      fetchSummary();
    } catch (err) {
      alert("Failed to delete transaction.");
    }
  };

  useEffect(() => {
    fetchSummary();
    fetchTransactions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: '900px', margin: 'auto', padding: '2rem' }}>
        <h2>Welcome to Finance Tracker</h2>

        {/* Summary Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div><strong>Total Income:</strong> ₹{summary.totalIncome}</div>
          <div><strong>Total Expense:</strong> ₹{summary.totalExpense}</div>
          <div><strong>Balance:</strong> ₹{summary.balance}</div>
        </div>

        {/* Pie Chart */}
        <Analytics />

        {/* Add Transaction Form */}
        <h3>Add Transaction</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await API.post('/transaction', {
                ...newTxn,
                amount: parseFloat(newTxn.amount),
              });
              setNewTxn({ title: '', amount: '', type: 'EXPENSE', category: '', date: '' });
              fetchTransactions();
              fetchSummary();
            } catch (err) {
              alert("Failed to add transaction.");
            }
          }}
          style={{ marginBottom: '2rem' }}
        >
          <input
            type="text"
            placeholder="Title"
            value={newTxn.title}
            onChange={(e) => setNewTxn({ ...newTxn, title: e.target.value })}
            required
            style={{ marginRight: '1rem' }}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newTxn.amount}
            onChange={(e) => setNewTxn({ ...newTxn, amount: e.target.value })}
            required
            style={{ marginRight: '1rem' }}
          />
          <select
            value={newTxn.type}
            onChange={(e) => setNewTxn({ ...newTxn, type: e.target.value })}
            style={{ marginRight: '1rem' }}
          >
            <option value="INCOME">INCOME</option>
            <option value="EXPENSE">EXPENSE</option>
          </select>
          <input
            type="text"
            placeholder="Category"
            value={newTxn.category}
            onChange={(e) => setNewTxn({ ...newTxn, category: e.target.value })}
            required
            style={{ marginRight: '1rem' }}
          />
          <input
            type="date"
            value={newTxn.date}
            onChange={(e) => setNewTxn({ ...newTxn, date: e.target.value })}
            style={{ marginRight: '1rem' }}
          />
          <button type="submit">Add</button>
        </form>

        {/* Filters */}
        <div style={{ marginBottom: '1rem' }}>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ marginRight: '1rem' }}>
            <option value="">All Types</option>
            <option value="INCOME">INCOME</option>
            <option value="EXPENSE">EXPENSE</option>
          </select>

          <input
            type="text"
            placeholder="Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ marginRight: '1rem' }}
          />

          <button onClick={async () => {
            try {
              const params = new URLSearchParams();
              if (filterType) params.append("type", filterType);
              if (filterCategory) params.append("category", filterCategory);
              const res = await API.get(`/transaction/filter?${params.toString()}`);
              setTransactions(res.data);
            } catch (err) {
              alert("Error filtering data");
            }
          }}>
            Apply Filters
          </button>

          <button onClick={fetchTransactions} style={{ marginLeft: '1rem' }}>
            Clear Filters
          </button>
        </div>

        {/* Transaction Table */}
        <h3>Transactions</h3>
        <table width="100%" border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.title}</td>
                <td>₹{txn.amount}</td>
                <td>{txn.type}</td>
                <td>{txn.category}</td>
                <td>{txn.date}</td>
                <td>
                  <button
                    onClick={() => handleDelete(txn.id)}
                    style={{ color: 'red', border: 'none', background: 'transparent', cursor: 'pointer' }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Logout Button */}
        <button onClick={handleLogout} style={{ marginTop: '2rem' }}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;