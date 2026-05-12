import { useContext } from "react";
import { Link } from "react-router-dom";
import CurrencyContext from "../context/CurrencyProvider";

function ExpenseList({ expenses, onDelete }) {
  const { currency } = useContext(CurrencyContext);

  if (expenses.length === 0) {
    return (
      <p>
        No expenses yet. <Link to="/add">Add one</Link>
      </p>
    );
  }

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      <ul className="">
        {expenses.map((e) => (
          <li className="expense-item" key={e.id}>
            <span className="expense-title">{e.title}</span>
            <span className="expense-amount">
              {currency}
              {e.amount}
            </span>
            <Link to={`/expense/${e.id}`}>View</Link>
            <button className="btn-delete" onClick={() => onDelete(e.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
