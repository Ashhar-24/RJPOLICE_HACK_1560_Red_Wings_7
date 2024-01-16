import React from "react";
import { useParams } from "react-router-dom";

const CustomerHistory = ({ transactions }) => {
  const { customerId } = useParams();

  // Filter transactions for the selected customer ID
  const customerTransactions = transactions.filter(
    (transaction) => transaction.CustomerID === parseInt(customerId)
  );

  return (
    <div className="flex flex-col py-12 px-14">
      <h1>Customer Transaction History :</h1>
      <h2>Customer ID: {customerId}</h2>
      <ul>
        {customerTransactions.map((transaction) => (
          <li key={transaction.Search_id}>
            <strong>Transaction ID:</strong> {transaction.TransactionID} <br />
            {/* Add more details based on your transaction data */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerHistory;
