import React, { useEffect, useRef, useState } from "react";

function AddExpenseForm({ onAdd } ) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState(0);


  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  },[]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !amount) return;

    onAdd({ title: title.trim(), amount: Number(amount), category });
    setTitle("");
    setAmount("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        ref={titleRef}
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
        <option>Food</option>
        <option>Travel</option>
        <option>Bills</option>
        <option>Shopping</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpenseForm;
