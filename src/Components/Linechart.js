import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  tension:0.3,
  plugins: {
    legend: {
      position: 'bottom' ,
    },
    title: {
      display: true,
      text: 'Total Transaction',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
// Database to be updated
  datasets: [
    {
      label: 'Self Credit',
    //   data:[],
    //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    data:[1000,2000,3000,5000,6000,8080,],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Self debit',
      data:[5000,8000,13000,1000,8600,1080,],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        label: 'Internet banking',
      //   data:[],
        
      data:[1500,25000,5000,15000,9000,880,],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
  ],
};

export  default function Linechart() {
  return <Line options={options} data={data} />;
}
