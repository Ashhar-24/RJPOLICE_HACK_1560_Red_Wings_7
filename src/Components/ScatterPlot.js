import React from "react";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const ScatterPlot = (props) => {
  // Extract relevant data for the scatter plot
  const xData = props.transactions.map((transaction) => transaction.AmountTransferred);
  const yData = props.transactions.map((transaction) => transaction.Distance);
  const fraudFlags = props.transactions.map((transaction) => transaction.FraudFlag);

  // Define color array based on fraud flag
  const colors = fraudFlags.map((fraudFlag) => (fraudFlag === 1 ? "red" : "blue"));

  // Scatter plot layout
  const layout = {
    title: "Transaction Amount vs. Distance",
    xaxis: { title: "Amount Transferred" },
    yaxis: { title: "Distance" },
  };

  // Scatter plot data
  const data = [
    {
      type: "scatter",
      mode: "markers",
      x: xData,
      y: yData,
      marker: { color: colors },
    },
  ];

  return <Plot data={data} layout={layout} />;
};

export default ScatterPlot;
