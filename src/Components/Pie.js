import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ transactions }) => {
  // Assuming transactions is an array of objects with a "TransactionType" field
  const transactionTypes = transactions.map((transaction) => transaction.TransactionType);

  // Count occurrences of each transaction type
  const countTransactionTypes = transactionTypes.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the pie chart
  const chartData = {
    labels: Object.keys(countTransactionTypes),
    datasets: [
      {
        data: Object.values(countTransactionTypes),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          // Add more colors if needed
        ],
      },
    ],
  };

  return (
    <div className='relative bottom-10'>
      <h2>Pie Chart</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default PieChart;
