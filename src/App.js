import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Credit from "./Components/Credit";
import Debit from "./Components/Debit";
import Netbanking from "./Components/Netbanking";
import Fraud from "./Components/Fraud";
import CustomerHistory from "./Components/CustomerHistory";

const DUMMY_TRANSACTION = [];

function App() {
  const [transactions, setTransactions] = useState(DUMMY_TRANSACTION);
  const [fraudTransactions, setFraudTransactions] = useState([]);
  const [customerPhoneMap, setCustomerPhoneMap] = useState({});

  function haversine(lat1, lon1, lat2, lon2) {
    // Convert latitude and longitude from degrees to radians
    const [rLat1, rLon1, rLat2, rLon2] = [lat1, lon1, lat2, lon2].map(
      (coord) => coord * (Math.PI / 180)
    );

    // Haversine formula
    const dLat = rLat2 - rLat1;
    const dLon = rLon2 - rLon1;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Radius of the Earth in kilometers
    const radius = 6371.0;

    // Calculate the distance
    const distance = radius * c;
    return distance;
  }

  function checkFraud(
    currentCoords,
    previousCoords,
    currentTime,
    previousTime
  ) {
    // Parse coordinates and convert to floats
    const [currentLat, currentLon] = currentCoords
      .replace(/[()]/g, "")
      .split(", ")
      .map(parseFloat);
    const [previousLat, previousLon] = previousCoords
      .replace(/[()]/g, "")
      .split(", ")
      .map(parseFloat);

    // Calculate distances
    const Distance = haversine(
      previousLat,
      previousLon,
      currentLat,
      currentLon
    );

    // Calculate time differences in seconds
    const currentTimeObj = new Date(currentTime);
    const previousTimeObj = new Date(previousTime);
    const timeDifference = (currentTimeObj - previousTimeObj) / 1000; // Convert to seconds

    // Check if the distance is feasible within the time frame
    const feasibleTime = (Distance * 1000) / 11.11; // using Avg Speed in India Of Cars.
    if (Distance > 50) {
      if (timeDifference < feasibleTime) {
        return 1; // Mark as fraud
      }
    } else {
      return 0; // Not fraud
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchId = transactions.length + 1;

        const res = await axios.get(
          `http://localhost:5000/api/Transactions/${searchId}`
        );

        console.log("Refresh Response:", res);

        setCustomerPhoneMap((prevMap) => ({
          ...prevMap,
          [res.data.CustomerID]: res.data.MobileNumber,
        }));

        const data = {
          CustomerID: res.data.CustomerID,
          TransactionType: res.data.TransactionType,
          AmountTransferred: res.data.AmountTransferred,
          ReceiverID: res.data.ReceiverID,
          InitialBalanceSender: res.data.InitialBalanceSender,
          FinalBalanceSender: res.data.FinalBalanceSender,
          InitialBalanceReceiver: res.data.InitialBalanceReceiver,
          FinalBalanceReceiver: res.data.FinalBalanceReceiver,
          DayOfWeek: 4,
          HourOfDay: 12,
        };
        const mlModelResponse = await axios
          .post("http://127.0.0.1:8000/predict", data)
          .catch((err) => console.log(err));

        console.log("ML Model Response:", mlModelResponse);

        // Check if the request was successful (status code 200)
        if (mlModelResponse && mlModelResponse.status === 200) {
          const predictions = mlModelResponse.data.predictions;

          console.log("Predictions:", predictions[0]);

          if (
            (predictions.length > 0 && predictions[0] === 1) ||
            res.data.KYC === 1
          ) {
            setFraudTransactions((prevFraudTransactions) => [
              ...prevFraudTransactions,
              searchId,
            ]);
          }
          const currData = { ...res.data }; // Copy the data to avoid mutating the original object
          currData.FraudFlag = predictions[0];

          if(predictions[0]===1){
            currData.Remark="Model Detected";
          }

          //checking for incomplete KYC
          if (res.data.KYC === 1) {
            currData.FraudFlag = 1;
            currData.Remark = "Not KYC";            
          }
          const ct = res.data.TransactionDate;
          const [, ctimeComponent] = ct.split("T");
          const cTime = ctimeComponent.slice(0, -1);

          const pRes = await axios.get(
            `http://localhost:5000/api/TransactionsPrev/${res.data.CustomerID}/${searchId}`
          );

          const pt = pRes.data.TransactionDate;

          if (pt) {
            const [, ptimeComponent] = pt.split("T");
            const pTime = ptimeComponent.slice(0, -1);
            if (
              checkFraud(
                res.data.CurrentCoordinate,
                pRes.data.CurrentCoordinate,
                cTime,
                pTime
              )
            ) {
              currData.FraudFlag = 1;
              currData.Remark = "Unusual Loacation";
            }
          }

          const phone = customerPhoneMap[res.data.CustomerID];
          const sameNumberAccounts = transactions.filter(
            (transaction) =>
              transaction.MobileNumber === phone && transaction.CustomerID !== res.data.CustomerID
          );
  
          if (sameNumberAccounts.length > 0) {
            // Mark transactions with the same phone number as fraud
            sameNumberAccounts.forEach((account) => {
              account.FraudFlag = 1;
              account.Remark = "Multiple No."
            });
  
            setFraudTransactions((prevFraudTransactions) => [
              ...prevFraudTransactions,
              ...sameNumberAccounts.map((account) => account.Search_id),
            ]);
          }
          setTransactions((prevTransactions) => [
            ...prevTransactions,
            currData,
          ]);

          console.log("updated Transactions are:", transactions);
        } else {
          console.error(
            "ML Model Request failed. Status:",
            mlModelResponse.status
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [transactions]);

  return (
    <div className="App w-full h-full overflow-auto flex absolute">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard transactions={transactions} />} />
        <Route
          path="/Credit"
          element={<Credit name = "Self-Credit" transactions={transactions} />}
        />
        <Route path="/Debit" element={<Debit name = "Self-debit" transactions={transactions} />} />
        <Route
          path="/Netbanking"
          element={<Netbanking name = "Netbanking" transactions={transactions} />}
        />
        <Route path="/fraud" element={<Fraud name = "fraud" transactions={transactions} />} />
        <Route
          path="/customer-history/:customerId"
          element={<CustomerHistory transactions={DUMMY_TRANSACTION} />}
        />
      </Routes>
    </div>
  );
}

export default App;
