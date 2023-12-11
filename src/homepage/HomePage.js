import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../reducers/AuthContext";
import "./homepage.css";
import CustomModal from "../modal/CustomModal";
import ExpenseForm from "../modal/expense/ExpenseForm";
import Dashboard from "../components/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, logout } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { expenseColors, incomeColors } from "../colors"; // Import colors
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [unsubscribeExpenses, setUnsubscribeExpenses] = useState(null);
  const [expenseCollection, setExpenseCollection] = useState(null);
  const [userFirstName, setUserFirstName] = useState("");

  const [Incomes, setIncomes] = useState([]);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid); // Corrected document reference
        try {
          const docSnapshot = await getDoc(userRef);
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            console.log("User", userFirstName);
            setUserFirstName(userData.firstName);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error getting document:", error);
        }
      } else {
        // User is signed out
        setUserFirstName("");
      }

      try {
        const uid = user.uid;
        // Fetch expenses
        const expenseCol = collection(db, "users", uid, "expenses");
        setExpenseCollection(expenseCol);

        // Log collection path for debugging
        console.log("Expense Collection Path:", expenseCol.path);

        const querySnapshot = await getDocs(expenseCol);
        const expensesData = querySnapshot.docs.map((doc) => doc.data());
        setTransactions(expensesData);

        // Fetch incomes
        const incomeCol = collection(db, "users", uid, "incomes");
        const incomeSnapshot = await getDocs(incomeCol);
        const incomesData = incomeSnapshot.docs.map((doc) => doc.data());
        setIncomes(incomesData);

        // Log fetched expenses data
        console.log("Fetched Expenses Data:", expensesData);
      } catch (error) {
        // Log any errors that occur
        console.error("Error fetching data:", error);
      }
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(user);
      }
    });

    return () => {
      // Unsubscribe from the authentication listener
      if (unsubscribeAuth) {
        unsubscribeAuth();
      }

      // Unsubscribe from the expenses listener
      if (unsubscribeExpenses) {
        unsubscribeExpenses();
      }
    };
  }, []); // Ensure an empty dependency array to run the effect only once when the component mounts
  const addExpense = async (newExpense) => {
    // Ensure expenseCollection is defined
    if (expenseCollection) {
      try {
        await addDoc(expenseCollection, newExpense);
        setTransactions([...transactions, newExpense]);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }

    setTransactions([...transactions, newExpense]);
    handleClose();
  };

  const expenses = transactions.filter(
    (transaction) => transaction.type === "Expense"
  );

  const incomes = transactions.filter(
    (transaction) => transaction.type === "Income"
  );
  //to calculate total expenses
  const totalIncome = incomes.reduce(
    (acc, income) => acc + parseFloat(income.amount),
    0
  );
  //to calculate total expenses
  const totalExpense = expenses.reduce(
    (acc, expense) => acc + parseFloat(expense.amount),
    0
  );
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login')
      console.log("User logged out");
      // Add any additional logic after successful logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <div className="log-btn">
      <button type="button" onClick={handleLogout}>
        Logout
      </button>{" "}
      </div>
      
      <h1>Your Expense Tracker</h1>
      {/* This row display expenses */}
      <main>
        <div className="expense_form">
          <h2>Your Expenses</h2>
          <hr />{" "}
          <div className="span-container">
            <ul>
              {expenses.map((expense, index) => (
                <li key={index}>
                  <span>{expense.source}</span>
                  <span
                    className="expense_category"
                    style={{ backgroundColor: expenseColors[index] }}
                  >
                    {expense.category}
                  </span>
                  <span className="expense">-${expense.amount}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="total">
            <span>Total Expenses: </span>
            <hr />

            <span className="expense">-${totalExpense}</span>
          </div>
        </div>

        {/* This row display income */}
        <div className="income_form">
          <h2>Your Incomes</h2>
          <hr />
          <ul>
            {incomes.map((income, index) => (
              <li key={index}>
                <span>{income.source}</span>
                <span
                  className="income_category"
                  style={{ backgroundColor: incomeColors[index] }}
                >
                  {income.category}
                </span>
                <span className="income">${income.amount}</span>
              </li>
            ))}
          </ul>
          <div className="total">
            <span>Total Income: </span>
            <hr />

            <span className="income">${totalIncome}</span>
          </div>
        </div>

        <button onClick={handleShow}>Add Transcation </button>
        <CustomModal
          show={showModal}
          onHide={handleClose}
          title="Income/Expense Form"
        >
          <ExpenseForm addExpense={addExpense} />
        </CustomModal>
        <div className="pie_chart">
          <Dashboard expenses={expenses} incomes={incomes} />
        </div>
      </main>
    </div>
  );
};
export default HomePage;
