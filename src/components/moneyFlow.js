import React, { useState } from "react";
import TransactionLogs from "./TransactionLogs"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./MoneyFlow.css";
import tdata from "./a.json";

const MoneyFlow = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("UPI");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionData, setTransactionData] = useState(tdata);
  
  // Filter transactions based on the selected payment method
  const filteredTransactions = transactionData.filter(
    (transaction) => transaction.method === selectedPaymentMethod
  );

  // total money transferred
  const totalMoneyTransferred = filteredTransactions
    .reduce(
      (total, transaction) => total + parseFloat(transaction.amount),
      0
    )
    .toFixed(2);

  // total accounts involved
  const totalAccountsInvolved = new Set([
    ...filteredTransactions.map((transaction) => transaction.senderAccount),
    ...filteredTransactions.map((transaction) => transaction.receiverAccount),
  ]).size;

  // number of accounts with fraud
  const numberOfAccountsWithFraud = filteredTransactions.filter(
    (transaction) => transaction.isSuspicious === true
  ).length;

  // Pagination
  const transactionsPerPage = 10;
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${
                selectedPaymentMethod === "UPI"
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => setSelectedPaymentMethod("UPI")}
            >
              UPI
            </button>
            <button
              type="button"
              className={`btn ${
                selectedPaymentMethod === "ATM Transactions"
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => setSelectedPaymentMethod("ATM Transactions")}
            >
              ATM
            </button>
            <button
              type="button"
              className={`btn ${
                selectedPaymentMethod === "Net Banking"
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => setSelectedPaymentMethod("Net Banking")}
            >
              Net Banking
            </button>
            <button
              type="button"
              className={`btn ${
                selectedPaymentMethod === "NEFT"
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => setSelectedPaymentMethod("NEFT")}
            >
              NEFT
            </button>
            <button
              type="button"
              className={`btn ${
                selectedPaymentMethod === "RTGS"
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
              onClick={() => setSelectedPaymentMethod("RTGS")}
            >
              RTGS
            </button>
          </div>
        </div>
        <div className="col-md-6 text-end">
          <button type="button" className="btn btn-warning">
            Suspicious Activities
          </button>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Payment Method Statistics</h5>
              <p>Total no of transactions: {filteredTransactions.length}</p>
              {/* <p>Total money transferred: ${totalMoneyTransferred}</p> */}
              <p>Total accounts involved: {totalAccountsInvolved}</p>
              <p>No of accounts with fraud: {numberOfAccountsWithFraud}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <TransactionLogs transactions={currentTransactions} />
          <nav className="mt-4" aria-label="Page navigation example">
            <ul className="pagination">
              {Array.from({
                length: Math.ceil(
                  filteredTransactions.length / transactionsPerPage
                ),
              }).map((item, index) => (
                <li
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  key={index}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MoneyFlow;
