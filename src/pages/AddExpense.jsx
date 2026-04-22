import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddExpense({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  // useNavigate — navigate programmatically after submit
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    onAdd({ title: title.trim(), amount: Number(amount), category });

    // After adding, send user to the expenses list
    navigate("/expenses");
  }

  return (
    <div className="add-form">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What did you spend on?"
        />
        <input className="form-input"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Shopping</option>
        </select>
        <button className="btn-primary" type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddExpense;
