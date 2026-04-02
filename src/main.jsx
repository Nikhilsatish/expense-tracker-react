import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import {CurrencyProvider} from "./context/CurrencyProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </ThemeProvider>
  </StrictMode>,
);
