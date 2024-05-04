import React, { useContext, useEffect } from "react";
import { SharedExpensesCtx } from "../../contexts/sharedExpenses_ctx";
import { UsersCtx } from "../../contexts/users_ctx";
import { ExpensesCtx } from "../../contexts/expenses_ctx";
import { CategoryCtx } from "../../contexts/category_ctx";
import moment from "moment";

const SharedWithMe = () => {
  const { sharedWithMeExpenses, getSharedExpensesWithMe } = useContext(SharedExpensesCtx);
  const { totalExpenses, getTotalExpenses } = useContext(ExpensesCtx);
  const { categories, getCategories } = useContext(CategoryCtx);
  const { users, getUsers } = useContext(UsersCtx);
  const { payload } = sharedWithMeExpenses;

  const getData = async () => {
    await getSharedExpensesWithMe();
    await getUsers();
    await getTotalExpenses();
  };

  useEffect(() => {
    getData();
  }, []);

  //console.log(totalExpenses);
  //::: BEGIN MAP DATI :::
  const findOwner = (ownerId) => {
    return users ? users.find((u) => u._id === ownerId) : null;
  };

  const findExpense = (expenseId) => {
    return totalExpenses ? totalExpenses.find((e) => e._id === expenseId) : null;
  };

  const findCategory = (categoryId) => {
    return categories ? categories.find((cat) => cat._id === categoryId) : null;
  };
  //::: END MAP DATI :::
  return (
    <>
      {payload && payload.length > 0 ? (
        payload.map((s) => {
          const user = findOwner(s.ownerId);
          const expense = findExpense(s.expenseId);
          const category = expense ? findCategory(expense.category) : null;
          console.log(category);
          //const category = findCategory(expense.categor);
          return (
            user &&
            category &&
            expense && (
              <div className="border border-1 rounded rounded-top-2 shadow px-2">
                <div>
                  <div className="d-flex flex-column ">
                    <span className="fs-5" htmlFor="1">
                      Expense owner:
                    </span>
                    <label>
                      {user.firstName} {user.lastName} - {user.email}
                    </label>
                    <hr className="m-1" />
                  </div>
                  <div className="d-flex flex-column ">
                    <h5>Expense details:</h5>
                    <label>Category: {category.categoryName}</label>
                    <label>Amount: {expense.amount}€</label>
                    <label>Date: {moment(expense.opDate).format("LL")}</label>
                  </div>
                </div>
              </div>
            )
          );
        })
      ) : (
        <p>Ciao</p>
      )}
    </>
  );
};

export default SharedWithMe;
