import { useMemo } from "react";

export function useExpenseSummary(expenses) {
  const { total, count, categoryTotals } = useMemo(() => {
    const categoryTotals = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});

    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const count = expenses.length;

    return { total, count, categoryTotals };
  }, [expenses]);

  return { total, count, categoryTotals };
}
