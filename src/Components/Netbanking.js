import React from 'react';
import Showdata from './Showdata';

const Netbanking = ({ transactions }) => {
  return (
    <div className="flex flex-col py-12 px-14">
      <h1>Netbanking Details</h1>
      {/* Display all transactions of "TransactionType": "online-transfer" */}
      <Showdata transactions={transactions} transactionType="online-transfer" />
    </div>
  );
};

export default Netbanking;
