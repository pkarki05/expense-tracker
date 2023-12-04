import React, { useContext, useState } from "react";
import { AuthContext } from "../reducers/AuthContext";
import "./homepage.css";
import CustomModal from "../modal/CustomModal";
import EpenseForm from "../modal/expense/ExpenseForm";
import ExpenseForm from "../modal/expense/ExpenseForm";
const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const [showModal, setShowModal] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const addExpense = (newExpense) => {
    setTransactions([...transactions, newExpense]);
    handleClose();
  };
  const expenses = transactions.filter(
    (transaction) => transaction.type === "Expense"
  );

  const incomes = transactions.filter(
    (transaction) => transaction.type === "Income"
  );
  return (
    <div >
      <h1>Expense Tracker</h1>
      {/* This row display expenses */}
      <main>
        <div className="expense_form">
        <h2>Your Expenses</h2>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              <span>{expense.source}</span>
              <span className="expense_category">{expense.category}</span>
              <span className="expense">-${expense.amount}</span>
            </li>
          ))}
        </ul>

        </div>
        
        {/* This row display income */}
        <div className="income_form">
        <h2>Your Incomes</h2>
        <ul>
          {incomes.map((income, index) => (
            <li key={index}>
              <span>{income.source}</span>
              <span className="income_category">{income.category}</span>
              <span className="income">${income.amount}</span>
            </li>
          ))}
        </ul>


        </div>

        
        <button onClick={handleShow}>Add Transcation </button>
        <CustomModal show={showModal} onHide={handleClose}>
          <ExpenseForm addExpense={addExpense} />
        </CustomModal>
      </main>
    </div>
  );
};

export default HomePage;
