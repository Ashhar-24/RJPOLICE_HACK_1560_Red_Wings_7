import React from 'react';
import "./TransactionLogs.css";


const TransactionLogs = ({ transactions }) => {
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Account Transaction Logs</h5>
        <ul className="list-group">
          {transactions.map((transaction, index) => (
            <li className={`list-group-item ${transaction.isSuspicious ? 'list-group-item-danger' : ''}`} key={index}>
              <strong>Transaction ID:</strong> {transaction.transactionId} <br />
              <strong>Sender Account:</strong> {transaction.senderAccount} <br />
              <strong>Receiver Account:</strong> {transaction.receiverAccount} <br />
              <strong>Time:</strong> {transaction.time} <br />
              <strong>Date:</strong> {transaction.date} <br />
              <strong>Place:</strong> {transaction.place} <br />
              <strong>Method:</strong> {transaction.method} <br />
              <strong>Status:</strong> {transaction.status} <br />
              <strong>Is Suspicious:</strong> {transaction.isSuspicious ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionLogs;
