// TransactionLogs.js
import React from 'react';
import './TransactionLogs.css';

const TransactionLogs = ({ transactions }) => {
  return (
    <div className="card_TL mt-4">
      <div className="card-body_TL">
        <h5 className="card-title_TL">Account Transaction Logs</h5>
        <table className="table_TL">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Sender Account</th>
              <th>Receiver Account</th>
              <th>Time</th>
              <th>Date</th>
              <th>Place</th>
              <th>Method</th>
              <th>Status</th>
              <th>Is Suspicious</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className={transaction.isSuspicious ? 'suspicious-row_TL' : ''}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.senderAccount}</td>
                <td>{transaction.receiverAccount}</td>
                <td>{transaction.time}</td>
                <td>{transaction.date}</td>
                <td>{transaction.place}</td>
                <td>{transaction.method}</td>
                <td>{transaction.status}</td>
                <td className={transaction.isSuspicious ? 'text-danger_TL' : ''}>
                  {transaction.isSuspicious ? 'Yes' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionLogs;
