import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const storedUser = localStorage.getItem('user');
const INITIAL_STATE = {
  currentUser: storedUser ? JSON.parse(storedUser) : null,
};
let currentUser;
try {
  currentUser = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  console.error('Error parsing stored user data:', error);
  currentUser = null;
}

// const INITIAL_STATE = {
//   currentUser,
// };

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(()=>{
localStorage.setItem('user',JSON.stringify(state.currentUser))
  },[state.currentUser])
  return (
    <AuthContext.Provider value={{ currentUser: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
