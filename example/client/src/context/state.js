import React, { createContext, useReducer } from "react"
import AppReducer from "./reducer"

const ininState = {
  accessToken:null,
}

export const AppContext = createContext(ininState)

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, ininState)

  function setState(payload) {
    dispatch({
      type: "SET_STATE",
      payload
    });
  }
  return (
    <AppContext.Provider value={{ ...state,dispatch,setState }}>
      {children}
    </AppContext.Provider>
  );
};
