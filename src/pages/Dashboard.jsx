function Dashboard({ expenses }) {
  // Derived — calculate from prop, never store separately
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="summary-card">
      <h2>Dashboard</h2>
      <p>Total spent: ₹{total}</p>
      <p>Expenses recorded: {expenses.length}</p>
    </div>
  );
}

export default Dashboard;
