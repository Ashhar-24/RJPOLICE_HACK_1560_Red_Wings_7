import React from "react";
import Linechart from "./Linechart";
import Piechart from "./Piechart";

function Dashboard({ transactions }) {
  // console.log("last chk", transactions);
  return (
    <div className="flex flex-col py-12 px-14">
      <h1 className="text-white text-2xl font-bold relative text-center">
        Dashboard
      </h1>

      {/* Display the transactions in a table */}
      <div className="py-10">
        <h1 className="font-bold text-2xl mb-4">Transaction Table:</h1>
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
              <th className="px-4 py-2">Remark</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.Search_id}
                className={transaction.FraudFlag ? "bg-red-500" : ""}
              >
                <td className="border px-4 py-2">{transaction.Search_id}</td>
                <td className="border px-4 py-2">
                  {transaction.TransactionID}
                </td>
                <td className="border px-4 py-2">{transaction.CustomerID}</td>
                <td className="border px-4 py-2">
                  {transaction.TransactionType}
                </td>
                <td className="border px-4 py-2">
                  {transaction.AmountTransferred}
                </td>
                <td className="border px-4 py-2">{transaction.ReceiverID}</td>
                <td className="border px-4 py-2">{transaction.FraudFlag}</td>
                <td className="border px-4 py-2">{transaction.Remark}</td>
                {/* Add more columns based on your transaction data */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* For the graph */}
      <div className="py-10 flex flex-col justify-around">
        <h1 className="flex right-6 font-bold text-2xl">Transaction Graph:</h1>
        <div className="flex justify-around max-w-4/5 max-h-[300px] pt-10 shadow-xl shadow-slate-950 rounded">
          <Linechart></Linechart>
          <Piechart></Piechart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
