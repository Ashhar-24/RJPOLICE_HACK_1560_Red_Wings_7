import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Fraud = ({ transactions }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleCustomerClick = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  return (
    <div className="flex flex-col py-12 px-14">
      <h1>Fraud Transactions</h1>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Search ID</th>
            <th className="px-4 py-2">Transaction ID</th>
            <th className="px-4 py-2">Customer ID</th>
            <th className="px-4 py-2">Transaction Type</th>
            <th className="px-4 py-2">Amount Transferred</th>
            <th className="px-4 py-2">Receiver ID</th>
            <th className="px-4 py-2">Fraud Flag</th>
            {/* Add more columns based on your transaction data */}
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            // Check if transactions is defined before mapping
            transaction.FraudFlag === 1 && (
              <tr key={transaction.Search_id} className="bg-red-500">
                <td className="border px-4 py-2">{transaction.Search_id}</td>
                <td className="border px-4 py-2">{transaction.TransactionID}</td>
                <td className="border px-4 py-2">
                  <Link to={`/customer-history/${transaction.CustomerID}`} onClick={() => handleCustomerClick(transaction.CustomerID)}>
                    {transaction.CustomerID}
                  </Link>
                </td>
                <td className="border px-4 py-2">{transaction.TransactionType}</td>
                <td className="border px-4 py-2">{transaction.AmountTransferred}</td>
                <td className="border px-4 py-2">{transaction.ReceiverID}</td>
                <td className="border px-4 py-2">{transaction.FraudFlag}</td>
                {/* Add more columns based on your transaction data */}
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fraud;
