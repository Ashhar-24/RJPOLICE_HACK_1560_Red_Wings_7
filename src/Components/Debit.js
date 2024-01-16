import React from 'react';
import Showdata from './Showdata';

const Debit = ({ transactions }) => {
  return (
    <div className="flex flex-col py-12 px-14">
      <h1>Debit Details</h1>
      {/* Display all transactions of "TransactionType": "Self-Debit" */}
      <Showdata transactions={transactions} transactionType="Self-Debit" />
    </div>
  );
};

export default Debit;
