import ThemeContext from "../context/ThemeProvider";
import CurrencyContext from "../context/CurrencyProvider";
import { useContext } from "react";

function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currency, toggleCurrency } = useContext(CurrencyContext);

  return (
    <div className="settings-section">
      <h3>Settings</h3>

      <div className="settings-list">
        <div className="settings-row">
          <div>
            <p className="settings-label">Theme</p>
            <p className="settings-hint">Switch between light and dark mode</p>
          </div>
          <button className="btn-primary btn-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        <div className="settings-row">
          <div>
            <p className="settings-label">Currency</p>
            <p className="settings-hint">
              Switch between Indian Rupee and US Dollar
            </p>
          </div>
          <button className="btn-primary btn-toggle" onClick={toggleCurrency}>
            {currency === "₹" ? "$ Switch to USD" : "₹ Switch to INR"}
          </button>
        </div>

        <div className="settings-row">
          <div>
            <p className="settings-label">Clear all data</p>
            <p className="settings-hint">
              Remove all expenses from localStorage
            </p>
          </div>
          <button
            className="btn-primary btn-danger"
            onClick={() => {
              if (
                window.confirm("Delete all expenses? This cannot be undone.")
              ) {
                localStorage.removeItem("expenses");
                window.location.reload();
              }
            }}
          >
            Clear Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
