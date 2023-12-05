import React from "react";
import { Pie } from "react-chartjs-2";


const PieChart = ({ data, title,options }) => {
  return (
    <div className="pie-chart-container">
      <h2>{title}</h2>
      <Pie data={data} options={options}/>
    </div>
  );
};

export default PieChart;
