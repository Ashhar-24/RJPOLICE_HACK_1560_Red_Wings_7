const res = {
    AmountTransferred: 265.729569662654,
    AverageAmounts: 132.864784831327,
    CurrentCoordinate: "(-43.40035674910105, 175.51245486605183)",
    CustomerID: 258,
    Distance: 1931.52041594954,
    FinalBalanceReceiver: 1646,
    FinalBalanceSender: 1646,
    FraudFlag: 1,
    HomeBranchCoordinate: "(-54.11263769150962, -163.5931046174522)",
    InitialBalanceReceiver: 1912,
    InitialBalanceSender: 1912,
    KYC: 0,
    MobileNumber: 917051537813,
    ReceiverID: 258,
    Search_id: 1,
    TransactionDate: "2023-01-16T12:30:19.390Z",
    TransactionID: "TB025800015375",
    TransactionType: "Self-Debit",
    _id: "65a6a5460be53e7083a0d50d"
  };
  
  // Extracting the time component from TransactionDate
  const dateTimeString = res.TransactionDate;
  const [, timeComponent] = dateTimeString.split('T');
  const formattedTimeComponent = timeComponent.slice(0, -1); // Remove the 'Z' at the end
  
  // Now `formattedTimeComponent` contains the time part
  console.log("Time Component:", formattedTimeComponent);
  