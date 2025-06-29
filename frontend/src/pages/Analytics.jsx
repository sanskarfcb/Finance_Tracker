import React, { useEffect, useState } from 'react';
import API from '../services/api';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const COLORS = ['#00C49F', '#FF8042'];

const Analytics = () => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });
  const [monthlyExpense, setMonthlyExpense] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await API.get('/transaction/summary');
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch summary.");
      }
    };

    const fetchMonthlyExpense = async () => {
      try {
        const res = await API.get('/transaction/monthly-data');

        // Transform the data for the chart
        const transformed = res.data.map((entry) => {
          const date = new Date(entry.month + '-01'); // convert "2025-06" to Date
          const monthName = date.toLocaleString('default', { month: 'short' }); // "Jun"
          return {
            month: monthName,
            total: entry.totalExpense
          };
        });

        setMonthlyExpense(transformed);
      } catch (err) {
        console.error("Failed to fetch monthly expenses.");
      }
    };

    fetchSummary();
    fetchMonthlyExpense();
  }, []);

  const pieData = [
    { name: 'Income', value: summary.totalIncome },
    { name: 'Expense', value: summary.totalExpense },
  ];

  return (
    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
      <h3>Income vs Expense</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Monthly Expense Chart */}
      <h3 style={{ marginTop: '3rem' }}>Monthly Expense Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyExpense}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#FF8042" name="Expense ₹" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;