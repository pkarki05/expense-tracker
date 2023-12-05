// src/components/Dashboard.js
import "./dashboard.css";
import React, { useEffect } from "react";
import PieChart from "./PieChart";
// import { Chart } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

const Dashboard = ({ expenses, incomes }) => {
  Chart.register(ArcElement);
  const expenseOptionList = [
    "Groceries",
    "Eating Out",
    "Shopping",
    "Health care",
    "Insurance",
    "Transportation",
    "Housing",
    "Rent",
    "Uncategorised",
  ];
  const incomeOptionList = [
    "Wages",
    " Salary",
    "Commision",
    "Interest ",
    "Gifts",
    "Investment",
    "Allowoance",
    "Government Payment",
    "Uncategorised",
  ];

  const calculateTotalByCategory = (transactions, categories) => {
    const categoryTotals = {};

    // Initialize categoryTotals with zeros for each category
    categories.forEach((category) => {
      categoryTotals[category] = 0;
    });

    transactions.forEach((transaction) => {
      // Use the category from the transaction to update the total
      categoryTotals[transaction.category] += parseFloat(transaction.amount);
    });

    return Object.values(categoryTotals);
  };

  const expenseData = {
    labels: expenseOptionList,
    datasets: [
      {
        data: calculateTotalByCategory(expenses, expenseOptionList),
        backgroundColor: [
          "#FF6384",
          "#FF9F40",
          "#FFCD56",
          "#FFD700",
          "#FF4500",
          "#FF6347",
          "#FF8C00",
          "#FFA07A",
          "#DAA520",
        ],
      },
    ],
  };

  const incomeData = {
    labels: incomeOptionList,
    datasets: [
      {
        data: calculateTotalByCategory(incomes, incomeOptionList),
        backgroundColor: [
          "#36A2EB",
          "#5F9EA0",
          "#20B2AA",
          "#00CED1",
          "#87CEEB",
          "#4682B4",
          "#4169E1",
          "#6A5ACD",
          "#8A2BE2",
        ],
      },
    ],
  };
  const options = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const label = data.labels[tooltipItem.index];
          const value = data.datasets[0].data[tooltipItem.index];
          return `${label}: $${value.toFixed(2)}`;
        },
      },
    },
  };

  return (
    <div className="pie_chart">
      <PieChart
        data={expenseData}
        title="Expense Distribution"
        options={options}
      />
      <PieChart
        data={incomeData}
        title="Income Distribution"
        options={options}
      />
    </div>
  );
};

export default Dashboard;
