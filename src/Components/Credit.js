import React from 'react';
import Showdata from './Showdata';

const Credit = (props) => {
  return (
    <div className="flex flex-col py-12 px-14">
      <h1>Credit Details</h1>
      {/* Display all transactions of "TransactionType": "Self-Credit" */}
      <Showdata transactions= {props.transactions} transactionType="Self-Credit" />
    </div>
  );
};

export default Credit;
