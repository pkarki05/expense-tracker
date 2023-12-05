import React, { useState } from "react";

const ExpenseForm = ({ addExpense }) => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Expense");
  const handlesubmit = (e) => {
    e.preventDefault();

    //check if source and amount are not empty
    if (source.trim() === "" || amount.trim() === "") {
      return;
    }
    // Create an expense object

    const newExpense = {
      source,
      amount,
      category,
      type,
    };
    // Call the addExpense function to update the parent component state
    addExpense(newExpense);

    // Clear the form inputs
    setSource("");
    setAmount("");
    setCategory("");
    setType("");
  };

  const expenseOptionList = [
    "---Select---",
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
    "---Select---",
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
  const [selectedRadio, setSelectedRadio] = useState("Expense");

  const handleRadionChange = (value) => {
    setType(value);
    setSelectedRadio(value);
  };

  return (
    <>
      <form onSubmit={handlesubmit}>
        <div className="wrapper">
          <div className="input_field">
            <div className="row">
              <label>Heading:</label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
            <div className="row">
              <label>Amount:</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="check_box">
            <div className="radio_btn">
              <label for="expense">Expense </label>
              <input
                type="radio"
                value="Expense"
                id="expense"
                checked={type === "Expense"}
                onChange={() => handleRadionChange("Expense")}
              />
               
            </div>
            <div className="radio_btn">
              <label for="income">Income</label>
              <input
                type="radio"
                value="Income"
                id="income"
                checked={type === "Income"}
                onChange={() => handleRadionChange("Income")}
              />
               
            </div>
             
          </div>
          <div className="dropdown">
            <label>Select {type} Category:</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {selectedRadio === "Expense"
                ? expenseOptionList.map((expense, index) => (
                    <option key={index} value={expense}>
                      {expense}
                    </option>
                  ))
                : incomeOptionList.map((income, index) => (
                    <option key={index} value={income}>
                      {income}
                    </option>
                  ))}
            </select>
          </div>
          <div className="add_btn">
            <button type="submit">Add</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ExpenseForm;
