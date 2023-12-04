import React, { useContext, useState } from "react";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../reducers/AuthContext";
import CustomModal from "../modal/CustomModal";
import SignUpForm from "../SignUpForm";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // If the login is successful, you can access the user data
      const user = userCredential.user;
      navigate("/");
      dispatch({ type: "LOGIN", payload: user });
      console.log("Logged in user:", user);
    } catch (error) {
      setError(true);
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div className="container">
      <div className="login">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Username/Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <span>Wrong email or password!</span>}
        </form>
        <div className="create_account">
          <button onClick={handleShow}>Create an Account</button>
          {/* Render the CustomModal component */}
          <CustomModal show={show} onHide={handleClose}>
        <SignUpForm />
      </CustomModal>        </div>
      </div>
    </div>
  );
};

export default Login;
