import React, { useContext, useEffect, useState } from "react";
import AxiosClient from "../../modules/AxiosClient/client";
import { SharedExpensesCtx } from "../../contexts/sharedExpenses_ctx";
import { ExpensesCtx } from "../../contexts/expenses_ctx";
import { CategoryCtx } from "../../contexts/category_ctx";

const MineShared = () => {
  const client = new AxiosClient();
  const { sharedExpenses, getMySharedExpenses } = useContext(SharedExpensesCtx);
  const { expenses, getExpenses } = useContext(ExpensesCtx);
  const { categories, getCategories } = useContext(CategoryCtx);
  const { payload } = sharedExpenses;
  const totalExpenses = expenses.expenses;

  const loadData = async () => {
    await getMySharedExpenses();
    await getCategories();
    await getExpenses();
  };

  useEffect(() => {
    loadData();
  }, []);

  //::: BEGIN MAP DATI :::
  const findExpenseById = (expenseId) => {
    return totalExpenses ? totalExpenses.find((expense) => expense._id === expenseId) : null;
  };

  const findCategoryByExpId = (expenseId) => {
    return categories ? categories.find((cat) => cat._id === expenseId) : null;
  };
  //::: END MAP DATI :::

  return (
    <>
      {payload &&
        payload.map((myShared) => {
          //map dati
          const expense = findExpenseById(myShared.expenseId);
          const cat = findCategoryByExpId(expense.category);

          return (
            <>
              {expense && (
                <>
                  <p>Expense Category: {cat.categoryName}</p>
                  <p>Amount: {expense.amount}</p>
                  {/* Altri dati dell'expense */}
                </>
              )}
              <p>
                {myShared.userSharedWithId.map((users) => {
                  return <p>User: {users}</p>;
                })}
              </p>
            </>
          );
        })}
    </>
  );
};

export default MineShared;
