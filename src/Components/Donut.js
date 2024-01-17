import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const calculatePercentage = (categoryTransactions, totalTransactions) => {
  return (categoryTransactions.length / totalTransactions) * 100;
};

async function fetchData(transactions) {
  const netTransaction = transactions.filter(
    (transaction) => transaction.TransactionType === "online-transfer"
  );

  const selfcreditTransaction = transactions.filter(
    (transaction) => transaction.TransactionType === "self credit"
  );

  const selfdebitTransaction = transactions.filter(
    (transaction) => transaction.TransactionType === "self debit"
  );

  const totalTransactions = transactions.length;

  const a = calculatePercentage(netTransaction, totalTransactions);
  const b = calculatePercentage(selfcreditTransaction, totalTransactions);
  const c = calculatePercentage(selfdebitTransaction, totalTransactions);

  return { netbanking: a, selfcredit: b, selfdebit: c };
}

export default function Donut(props) {
  const { transactions } = props;

  const [data, setdata] = useState({
    labels: ["Net Transfer", "Self Credit", "Self Debit"],
    datasets: [
      {
        label: "% of Transactions",
        data: [0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    async function fetchDataAndUpdate() {
      const { netbanking, selfcredit, selfdebit } = await fetchData(transactions);

      setdata({
        labels: ["Net Transfer", "Self Credit", "Self Debit"],
        datasets: [
          {
            label: "% of Transactions",
            data: [selfcredit, selfdebit, netbanking],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }

    fetchDataAndUpdate();
  }, [transactions]);

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
}