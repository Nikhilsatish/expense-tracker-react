import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
} from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Dashboard from "./pages/Dashboard";
import ExpenseList from "./pages/ExpenseList";
import AddExpense from "./pages/AddExpense";
import Settings from "./pages/Settings";
import ExpenseDetail from "./pages/ExpenseDetail";
import "./App.css";
import { useContext } from "react";
import ThemeContext from "./context/ThemeProvider";

const INITIAL_EXPENSES = [
  {
    id: 1,
    title: "Lunch at office",
    amount: 250,
    category: "Food",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Auto to station",
    amount: 80,
    category: "Travel",
    date: "2024-01-15",
  },
  {
    id: 3,
    title: "Netflix",
    amount: 199,
    category: "Bills",
    date: "2024-01-14",
  },
  {
    id: 4,
    title: "Grocery run",
    amount: 620,
    category: "Shopping",
    date: "2024-01-13",
  },
  {
    id: 5,
    title: "Dinner out",
    amount: 480,
    category: "Food",
    date: "2024-01-12",
  },
];

function App() {
  // State lives here — passed as props to each page
  const [expenses, setExpenses] = useLocalStorage("expenses", INITIAL_EXPENSES);
  const { theme } = useContext(ThemeContext);
  function handleAdd(newExpense) {
    setExpenses([{ ...newExpense, id: Date.now() }, ...expenses]);
  }

  function handleDelete(id) {
    setExpenses(expenses.filter((e) => e.id !== id));
  }

  return (
    <BrowserRouter>
      <div className={`app ${theme}`}>
        <nav className="navbar">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/expenses">Expenses</NavLink>
          <NavLink to="/add">+ Add</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Pass what each page needs as props */}
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

          <Route path="/settings" element={<Settings />} />

          <Route
            path="/expense/:id"
            element={<ExpenseDetail expenses={expenses} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
