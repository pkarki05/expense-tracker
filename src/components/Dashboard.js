// src/components/Dashboard.js
import "./dashboard.css";
import React, { useEffect } from "react";
import PieChart from "./PieChart";
// import { Chart } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { expenseColors, incomeColors } from "../colors"; // Import colors

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
        backgroundColor: expenseColors,
      },
    ],
  };

  const incomeData = {
    labels: incomeOptionList,
    datasets: [
      {
        data: calculateTotalByCategory(incomes, incomeOptionList),
        backgroundColor: incomeColors,
      },
    ],
  };
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
