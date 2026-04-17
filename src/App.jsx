import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AddExpenseForm from "./components/AddExpenseForm";
import ThemeContext from "./context/ThemeProvider";
import CurrencyContext from "./context/CurrencyProvider";
import "./App.css";

const INITIAL = [
  { id: 1, title: "Lunch", amount: 250, category: "Food" },
  { id: 2, title: "Auto", amount: 80, category: "Travel" },
  { id: 3, title: "Netflix", amount: 199, category: "Bills" },
];

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : INITIAL;
  });

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currency } = useContext(CurrencyContext);
  const prevTotalRef = useRef(0);
  const [diff, setDiff] = useState(0);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  useEffect(() => {
    console.log("App mounted");
    return () => console.log("App unmounted");
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    const prev = prevTotalRef.current;
    setDiff(total - prev);
    prevTotalRef.current = total;
  }, [total]);

  function handleAdd(newExpense) {
    setExpenses([{ ...newExpense, id: Date.now() }, ...expenses]);
  }

  const handleDelete = useCallback((id) => {
    setExpenses((prev) =>
      prev.filter((expense) => {
        return expense.id !== id;
      }),
    );
  }, []);

  const categoryTotals = useMemo(() => {
    return expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
  }, [expenses]);

  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>
        {theme === "light" ? "Dark" : "Light"}
      </button>

      <h1>ExpenseTracker</h1>
      <p>
        Total: {currency}
        {total}
      </p>
      {diff !== 0 && (
        <p>
          Change: {diff > 0 ? "+" : ""}
          {diff}
        </p>
      )}

      {Object.entries(categoryTotals).map(([category, cattotal]) => (
        <p key={category}>
          {category} = {cattotal}
        </p>
      ))}

      <AddExpenseForm onAdd={handleAdd} />

      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            <span>{e.title}</span>
            <span>{e.category}</span>
            <span>₹{e.amount}</span>
            <button onClick={() => handleDelete(e.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
