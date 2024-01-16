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
      <ul>
        {transactions?.map((transaction) => (
          // Check if transactions is defined before mapping
          transaction.FraudFlag === 1 && (
            <li key={transaction.Search_id}>
              <strong>Transaction ID:</strong> {transaction.TransactionID} <br />
              <strong>Customer ID:</strong> 
              <Link to={`/customer-history/${transaction.CustomerID}`} onClick={() => handleCustomerClick(transaction.CustomerID)}>
                {transaction.CustomerID}
              </Link>
              <br />
              {/* Add more details based on your transaction data */}
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default Fraud;
