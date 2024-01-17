import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const TransactionMap = ({ transactions }) => {
  return (
    <MapContainer
      center={[0, 0]} // Set the initial center of the map
      zoom={2} // Set the initial zoom level
      style={{ width: '100%', height: '400px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {transactions.map((transaction) => (
        <Marker
          key={transaction.Search_id}
          position={[
            parseFloat(transaction.HomeBranchCoordinate.split(',')[0].slice(1)),
            parseFloat(transaction.HomeBranchCoordinate.split(',')[1].slice(0, -1)),
          ]}
        >
          <Popup>
            Transaction ID: {transaction.TransactionID} <br />
            Amount Transferred: {transaction.AmountTransferred} <br />
            Customer ID: {transaction.CustomerID}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TransactionMap;
