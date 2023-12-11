import React, { useContext, useState } from "react";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../reducers/AuthContext";
import CustomModal from "../modal/CustomModal";
import SignUpForm from "../SignUpForm";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
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
      // Clear the error state on successful login
      setError(false);
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
          <div className="password-input">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="toggle-password-visibility"
              onClick={handleTogglePasswordVisibility}
            >
              {passwordVisible ? (
                <FaRegEyeSlash className="password-visibility" />
              ) : (
                <FaRegEye className="password-visibility" />
              )}
            </div>
          </div>

          <button type="submit">Login</button>
          {error && <span>Wrong email or password!</span>}
        </form>
        <div className="create_account">
          <button onClick={handleShow}>Create an Account</button>
          {/* Render the CustomModal component */}
          <CustomModal show={show} onHide={handleClose} title="Sign Up">
            <SignUpForm onClose={handleClose} />
          </CustomModal>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
