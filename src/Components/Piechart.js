import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Credit', 'Debit', 'Netbanking'],
  datasets: [
    {
      label: '% of transaction',
      data: [20, 70, 80],
      backgroundColor: [
        'rgba(255, 99, 132,0.7)',
        'rgba(255, 255, 0,0.7)',
        'rgba(255, 0, 0,0.7)',
      ],
      borderColor: [
        'rgba(255, 99, 132,0.7)',
        'rgba(255, 255, 0,0.7)',
        'rgba(255, 0, 0,0.7)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function Linechart() {
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Transaction Distribution %', // Your title here
        fontSize: 16,
      },
    },
  };

  return <Pie data={data} options={options} />;
}
