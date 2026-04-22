import { Link } from "react-router-dom";

function ExpenseList({ expenses, onDelete }) {
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
            <span className="expense-amount">₹{e.amount}</span>
            <Link to={`/expense/${e.id}`}>View</Link>
            <button className="btn-primary btn-delete" onClick={() => onDelete(e.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
