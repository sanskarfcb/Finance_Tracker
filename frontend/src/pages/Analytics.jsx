import React, { useEffect, useState } from 'react';
import API from '../services/api';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#00C49F', '#FF8042'];

const Analytics = () => {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await API.get('/transaction/summary');
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch summary.");
      }
    };
    fetchSummary();
  }, []);

  const pieData = [
    { name: 'Income', value: summary.totalIncome },
    { name: 'Expense', value: summary.totalExpense }
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;