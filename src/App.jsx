import { useEffect, useState } from "react";
import AddExpenseForm from "./components/AddExpenseForm";

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

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    console.log("App mounted");
    return () => console.log("App unmounted");
  }, []);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  function handleAdd(newExpense) {
    setExpenses([{ ...newExpense, id: Date.now() }, ...expenses]);
  }

  function handleDelete(id) {
    setExpenses(
      expenses.filter((expense) => {
        return expense.id !== id;
      }),
    );
  }

  if (expenses.length === 0) return "Empty list...!";

  return (
    <div className="app">
      <h1>💸 ExpenseTracker</h1>
      <p>Total: ₹{total}</p>

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
