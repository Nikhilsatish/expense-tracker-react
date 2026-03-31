import { useState } from "react";

const INITIAL = [
  { id: 1, title: "Lunch", amount: 250, category: "Food" },
  { id: 2, title: "Auto", amount: 80, category: "Travel" },
  { id: 3, title: "Netflix", amount: 199, category: "Bills" },
];

function App() {
  const [expenses, setExpenses] = useState(INITIAL);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState(0);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  function handleAdd(e) {
    e.preventDefault();

    if (!title.trim() || !amount) return;

    setExpenses([
      {
        id: Date.now(),
        title: title.trim(),
        amount: Number(amount),
        category: category,
      },
      ...expenses,
    ]);
    setTitle("");
    setAmount("");
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

      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What did you spend on?"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount ₹"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
        </select>
        <button type="submit">Add</button>
      </form>
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
