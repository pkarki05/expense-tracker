import React from "react";
import { Pie } from "react-chartjs-2";
import "./dashboard.css";

const PieChart = ({ data, title }) => {
  // ... (Previous code)

  const options = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const label = data.labels[tooltipItem.index];
          const value = data.datasets[0].data[tooltipItem.index];
          const percentage = (
            (value / data.datasets[0].data.reduce((a, b) => a + b, 0)) *
            100
          ).toFixed(2);
          return `${label}: $${value.toFixed(2)} (${percentage}%)`;
        },
      },
    },
  };

  // ... (Remaining code)

  return (
    <div className="pie-chart-container">
      <h2>{title}</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
