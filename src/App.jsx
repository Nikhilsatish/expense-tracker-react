import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import ThemeContext from "./context/ThemeProvider";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./App.css";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const ExpenseList = lazy(() => import("./pages/ExpenseList"));
const AddExpense = lazy(() => import("./pages/AddExpense"));
const Settings = lazy(() => import("./pages/Settings"));
const ExpenseDetail = lazy(() => import("./pages/ExpenseDetail"));

const INITIAL_EXPENSES = [
  { id: 1, title: "Lunch", amount: 250, category: "Food", date: "2025-01-10" },
  { id: 2, title: "Auto", amount: 80, category: "Travel", date: "2025-01-11" },
  {
    id: 3,
    title: "Netflix",
    amount: 199,
    category: "Bills",
    date: "2025-01-12",
  },
];

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [expenses, setExpenses] = useLocalStorage("expenses", INITIAL_EXPENSES);

  function handleAdd(newExpense) {
    setExpenses([{ ...newExpense, id: Date.now() }, ...expenses]);
  }

  function handleDelete(id) {
    setExpenses(expenses.filter((e) => e.id !== id));
  }

  function handleClear() {
    setExpenses([]);
  }

  return (
    <BrowserRouter>
      <div className={`app ${theme}`}>
        <nav className="navbar">
          <span className="navbar-brand">💸 ExpenseTracker</span>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/expenses">Expenses</NavLink>
          <NavLink to="/add">+ Add</NavLink>
          <NavLink to="/settings">Settings</NavLink>
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </nav>

        <Suspense
          fallback={
            <p style={{ padding: "40px", textAlign: "center" }}>Loading...</p>
          }
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={<Dashboard expenses={expenses} />}
            />
            <Route
              path="/expenses"
              element={
                <ExpenseList expenses={expenses} onDelete={handleDelete} />
              }
            />
            <Route path="/add" element={<AddExpense onAdd={handleAdd} />} />
            <Route
              path="/settings"
              element={<Settings onClear={handleClear} />}
            />
            <Route
              path="/expense/:id"
              element={<ExpenseDetail expenses={expenses} />}
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
