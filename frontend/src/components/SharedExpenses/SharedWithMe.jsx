import React, { useContext, useEffect } from "react";
import { SharedExpensesCtx } from "../../contexts/sharedExpenses_ctx";
import { UsersCtx } from "../../contexts/users_ctx";
import { ExpensesCtx } from "../../contexts/expenses_ctx";
import { CategoryCtx } from "../../contexts/category_ctx";
import moment from "moment";

const SharedWithMe = () => {
  const { sharedWithMeExpenses, getSharedExpensesWithMe } = useContext(SharedExpensesCtx);
  const { totalExpenses, getTotalExpenses, getAllExpensesForShared, allExpensesForShared } = useContext(ExpensesCtx);
  const { categories, getCategories } = useContext(CategoryCtx);
  const { users, getUsers } = useContext(UsersCtx);
  const { payload } = sharedWithMeExpenses;

  const getData = async () => {
    await getSharedExpensesWithMe();
    await getUsers();
    await getTotalExpenses();
    await getAllExpensesForShared();
  };

  useEffect(() => {
    getData();
  }, []);

  //console.log(totalExpenses);
  //::: BEGIN MAP DATI :::
  const findOwner = (ownerId) => {
    return users ? users.find((u) => u._id === ownerId) : null;
  };

  console.log(payload);
  const findExpense = (expenseId) => {
    console.log(allExpensesForShared);
    // console.log(expenseId);
    const myExpense = allExpensesForShared ? allExpensesForShared.find((e) => e._id === expenseId) : null;
    // console.log(myExpense);
    return myExpense;
  };

  const findCategory = (categoryId) => {
    return categories ? categories.find((cat) => cat._id === categoryId) : null;
  };
  //::: END MAP DATI :::
  return (
    <>
      {payload && payload.length > 0 ? (
        payload.map((p) => {
          console.log(totalExpenses);
          console.log(p);
          const user = findOwner(p.ownerId);
          // console.log(s.expenseId);
          const expense = findExpense(p.expenseId);
          console.log(expense);
          const category = expense ? findCategory(expense.category) : null;

          return (
            user &&
            category &&
            expense && (
              <div className="border border-1 col-lg-3 col-md-6 col-sm-12 rounded rounded-1">
                <div className="d-flex flex-column ">
                  <span className="fs-5" htmlFor="1">
                    Owner:
                  </span>
                  <span>
                    {user.firstName} {user.lastName} <br />
                  </span>
                  <span className="text-truncate " title={user.email}>
                    {user.email}
                  </span>
                  <hr className="m-1" />
                </div>
                <div className="d-flex flex-column ">
                  <h5>Details:</h5>
                  <label className="text-truncate" title={category.categoryName}>
                    Category: {category.categoryName}
                  </label>
                  <label>Amount: {expense.amount}€</label>
                  <label className="text-truncate" title={moment(expense.opDate).format("LL")}>
                    Date: {moment(expense.opDate).format("LL")}
                  </label>
                </div>
              </div>
            )
          );
        })
      ) : (
        <p className="ps-4">No expenses shared to view</p>
      )}
    </>
  );
};

export default SharedWithMe;
