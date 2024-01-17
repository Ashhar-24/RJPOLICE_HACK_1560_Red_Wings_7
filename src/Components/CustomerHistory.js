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
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Search ID</th>
            <th className="px-4 py-2">Transaction ID</th>
            <th className="px-4 py-2">Transaction Type</th>
            <th className="px-4 py-2">Amount Transferred</th>
            <th className="px-4 py-2">Receiver ID</th>
            <th className="px-4 py-2">Fraud Flag</th>
            {/* Add more columns based on your transaction data */}
          </tr>
        </thead>
        <tbody>
          {customerTransactions.map((transaction) => (
            <tr key={transaction.Search_id}>
              <td className="border px-4 py-2">{transaction.Search_id}</td>
              <td className="border px-4 py-2">{transaction.TransactionID}</td>
              <td className="border px-4 py-2">{transaction.TransactionType}</td>
              <td className="border px-4 py-2">{transaction.AmountTransferred}</td>
              <td className="border px-4 py-2">{transaction.ReceiverID}</td>
              <td className="border px-4 py-2">{transaction.FraudFlag}</td>
              {/* Add more columns based on your transaction data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerHistory;
