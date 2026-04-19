import { useMemo } from "react";

export function useExpenseSummary(expenses) {
  const categoryTotals = useMemo(() => {
    return expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
  }, [expenses]);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return { total, categoryTotals };
}
