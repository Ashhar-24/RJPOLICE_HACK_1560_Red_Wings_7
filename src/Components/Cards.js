import React, { useState, useEffect } from "react";

const Cards = (props) => {
  const [transactionCounts, setTransactionCounts] = useState({
    noNetBanking: 0,
    noSelfCredit: 0,
    noSelfDebit: 0,
  });

  useEffect(() => {
    // Check if props.transactions is truthy before performing filter
    if (props.transactions && props.transactions.length > 0) {
      // Calculate counts when transactions change
      const netBankingCount = props.transactions.filter(
        (transaction) => transaction.transactionType === "netBanking"
      ).length;

      const selfCreditCount = props.transactions.filter(
        (transaction) => transaction.transactionType === "selfCredit"
      ).length;

      const selfDebitCount = props.transactions.filter(
        (transaction) => transaction.transactionType === "selfDebit"
      ).length;

      // Update state with the calculated counts
      setTransactionCounts({
        noNetBanking: netBankingCount,
        noSelfCredit: selfCreditCount,
        noSelfDebit: selfDebitCount,
      });
    } else {
      // If transactions is falsy or empty, set counts to 0
      setTransactionCounts({
        noNetBanking: 0,
        noSelfCredit: 0,
        noSelfDebit: 0,
      });
    }
  }, [props.transactions]); // Dependency array to trigger the effect when transactions change

  return (
    <div className="flex flex-col justify-evenly">
      <div
        href="#"
        className="block max-w-sm p-6 m-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-blue-500 dark:border-green-400 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight dark:text-slate-50">
          Netbanking
        </h5>
        <p className="font-normal text-2xl text-gray-700 dark:text-slate-50 ">
          {transactionCounts.noNetBanking}
        </p>
      </div>
      <div
        href="#"
        className="block max-w-sm p-6 m-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-yellow-400 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight dark:text-white">
          Self-Credit
        </h5>
        <p className="font-normal text-2xl text-gray-700 dark:text-slate-50 ">
          {transactionCounts.noSelfCredit}
        </p>
      </div>

      <div
        href="#"
        className="block max-w-sm p-6 m-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-red-400 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight dark:text-white">
          Self Debit
        </h5>
        <p className="font-normal text-2xl text-gray-700 dark:text-slate-50 ">
          {transactionCounts.noSelfDebit}
        </p>
      </div>
    </div>
  );
};

export default Cards;
