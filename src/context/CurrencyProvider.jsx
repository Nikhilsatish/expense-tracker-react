import React, { createContext, useState } from "react";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("₹");

  function toggleCurrency() {
    setCurrency((t) => (t === "₹" ? "$" : "₹"));
  }

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export default CurrencyContext;
