import { useExpenseSummary } from "../hooks/useExpenseSummary";

function Dashboard({ expenses }) {
  const { total, categoryTotals, count } = useExpenseSummary(expenses);

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-label">Total Spent</div>
          <div className="summary-value">₹{total}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Expenses</div>
          <div className="summary-value">{count}</div>
        </div>
      </div>

      {count > 0 ? (
        <div className="category-list">
          <h3>By Category</h3>
          {Object.entries(categoryTotals).map(([cat, amt]) => (
            <div key={cat} className="category-row">
              <span>{cat}</span>
              <span>₹{amt}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          No expenses yet. <a href="/add">Add one</a>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
