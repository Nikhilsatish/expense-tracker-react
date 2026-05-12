import { useContext } from "react";
import { useParams } from "react-router-dom";
import CurrencyContext from "../context/CurrencyProvider";

function ExpenseDetail({ expenses }) {
  const { currency } = useContext(CurrencyContext);
  const { id } = useParams();
  const expense = expenses.find((e) => e.id === Number(id));

  if (!expense) {
    return <p>Expense not found.</p>;
  }

  return (
    <div className="detail-card">
      <h2>{expense.title}</h2>
      <p>
        Amount: {currency}
        {expense.amount}
      </p>
      <p>Category: {expense.category}</p>
    </div>
  );
}

export default ExpenseDetail;
