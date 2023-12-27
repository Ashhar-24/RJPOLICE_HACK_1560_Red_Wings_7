import React, { useState } from "react";
import "./SuspiciousActivitiesPage.css";
import Modal from "./UI/Modal";

const SuspiciousAccountsPage = () => {
  const [isViewingSus, setViewingSus] = useState(false);
  const [isViewingCon, setViewingCon] = useState(false);
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "Mohd ashhar",
      AcNo: "3555928865599",
      detectedBy: "Model",
      isSuspicious: null,
    },
    {
      id: 2,
      name: "Abhirajkar Bajpai",
      AcNo: "6655928264899",
      detectedBy: "Model",
      isSuspicious: null,
    },
    {
      id: 3,
      name: "Deepank Singh",
      AcNo: "1564848665599",
      detectedBy: "Model",
      isSuspicious: null,
    },
    {
      id: 3,
      name: "Puneet Prashar",
      AcNo: "1564848665599",
      detectedBy: "Model",
      isSuspicious: null,
    },
  ]);

  const handleConfirmation = (accountId, isSuspicious) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === accountId ? { ...account, isSuspicious } : account
      )
    );
  };

  const handleBackButtonClick = () => {
    setViewingSus(false);
  };
  const handleConBackButtonClick = () => {
    setViewingCon(false);
  };

  const confirmedAccounts = [
    { accountId: 1, accountNumber: "123456789" },
    { accountId: 2, accountNumber: "987654321" },
    // Add more fake accounts as needed
  ];

  return (
    <div className="page-container">
      {isViewingSus && (
        <Modal>
          <div className="suspicious-accounts-page">
            <button className="back-button" onClick={handleBackButtonClick}>
              Back
            </button>
            {accounts.map((account) => (
              <div key={account.id} className="suspicious-account-row">
                <div className="account-details">
                  <p>Name: {account.name}</p>
                  <p>A/c No: {account.AcNo}</p>
                  <p>Detected By: {account.detectedBy}</p>
                </div>
                <div className="confirmation-buttons">
                  <button onClick={() => handleConfirmation(account.id, true)}>
                    Yes
                  </button>
                  <button onClick={() => handleConfirmation(account.id, false)}>
                    No
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
      {isViewingCon && (
        <Modal>
          <div className="container mt-4">
            <button className="back-button" onClick={handleConBackButtonClick}>
              Back
            </button>
            <div className="page-container_CF">
              <div className="container_CF mt-4">
                <div className="row_CF">
                  <div className="col-md-12_CF">
                    <h2 className="mb-4_CF">Confirmed Fake Accounts</h2>
                  </div>
                </div>
                <div className="row_CF">
                  {confirmedAccounts.map((account) => (
                    <div
                      className="col-md-4_CF mb-4_CF"
                      key={account.accountId}
                    >
                      <div className="card_CF">
                        <div className="card-body_CF">
                          <h5 className="card-title_CF">
                            Account {account.accountId}
                          </h5>
                          <ul className="list-group_CF">
                            <li className="list-group-item_CF">
                              <strong>Account Number:</strong>{" "}
                              {account.accountNumber}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <div className="card suspicious-card" onClick={() => setViewingSus(true)}>
        <h2>Suspicious Fake Accounts</h2>
        <p>Detect by Model</p>
      </div>

      <div className="card confirmed-card" onClick={() => setViewingCon(true)}>
        <h2>Confirmed Fake Accounts</h2>
        <p>Confirmed by Bank officials</p>
      </div>
    </div>
  );
};

export default SuspiciousAccountsPage;
