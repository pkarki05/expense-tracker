import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CustomModal from "./modal/CustomModal";

const SignUpForm = ({ onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (user) => {
    try {
      setLoading(true);
      const db = getFirestore();
      // Your form submission logic
      const docRef = await addDoc(collection(db, "users"), {
        userId: user.uid,
        firstName,
        surName,
        phoneNum,
        email,
        dob,
        gender,
      });
      toast.success("User Created successfully!");
      // resetForm();
      // setShowModal(false);
      onClose();
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMismatchError(true);
      return;
    }
    setPasswordMismatchError(false);

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User Signed Up:", user);
      setShowModal(false);

      await handleFormSubmit(user);
    } catch (error) {
      setError(error.message);
      console.error("Error signing up:", error);
    } finally {
      setLoading(false);
    }
  };

  // const resetForm = () => {
  //   setFirstName("");
  //   setSurName("");
  //   setPhoneNum("");
  //   setEmail("");
  //   setPassword("");
  //   setConfirmPassword("");
  //   setDob("");
  //   setGender("Male");
  //   setError(null);
  // };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder=" First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Surname"
            value={surName}
            onChange={(e) => setSurName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder=" Phone Number"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
          />
          <input
            type="email"
            placeholder=" E-mail Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Choose Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordMismatchError && (
            <p style={{ color: "red" }}>Passwords mismatch</p>
          )}
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
      {/* Render the CustomModal component */}
      {/* <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        handleSubmit={handleSubmit}
        passwordMismatchError={passwordMismatchError}
        loading={loading}
        error={error}
      /> */}
    </>
  );
};

export default SignUpForm;
