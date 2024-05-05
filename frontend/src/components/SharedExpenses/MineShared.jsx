import React, { useContext, useEffect, useState } from "react";
import { SharedExpensesCtx } from "../../contexts/sharedExpenses_ctx";
import { ExpensesCtx } from "../../contexts/expenses_ctx";
import { CategoryCtx } from "../../contexts/category_ctx";
import { UsersCtx } from "../../contexts/users_ctx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
const MineShared = () => {
  const { sharedExpenses, getMySharedExpenses, delSharedExpense } = useContext(SharedExpensesCtx);
  const { allUserExpenses, getUserExpenses } = useContext(ExpensesCtx);
  const { categories, getCategories } = useContext(CategoryCtx);
  const { users, getUsers } = useContext(UsersCtx);
  const { payload } = sharedExpenses;
  const { expenses } = allUserExpenses;
  const [deleted, setDeleted] = useState(false);
  const [elementToBeDeleted, setElementToBeDeleted] = useState("");
  const [error, setError] = useState(false);

  const loadData = async () => {
    await getMySharedExpenses();
    await getCategories();
    await getUserExpenses();
    await getUsers();
  };

  const verifyDelete = (id) => {
    setDeleted(true);
    setElementToBeDeleted(id);

    if (deleted) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger me-2",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: `<b>I'm deleting the expense</b>`,
          text: "Do you really want to delete it?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Si!",
          cancelButtonText: "No!",
          reverseButtons: true,
          willClose: () => {
            setDeleted(false);
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            try {
              delSharedExpense(elementToBeDeleted);
            } catch (e) {
              setError(e);
              console(e);
            }
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your expenses has been deleted.",
              icon: "success",
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancellazione annullata",
              text: "",
              icon: "error",
            });
          }
        });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  //::: BEGIN MAP DATI :::
  const findExpenseById = (expenseId) => {
    return expenses ? expenses.find((expense) => expense._id === expenseId) : null;
  };

  const findCategoryByExpId = (catId) => {
    return categories ? categories.find((cat) => cat._id === catId) : null;
  };

  const findUsersSharedWitdh = (userId) => {
    return users ? users.find((u) => u._id === userId) : null;
  };
  //::: END MAP DATI :::

  return (
    <div className=" d-flex flex-column mt-3 mx-3 gap-2">
      {payload && payload.length > 0 ? (
        payload.map((myShared) => {
          //map dati
          const expense = findExpenseById(myShared.expenseId);
          const cat = expense ? findCategoryByExpId(expense.category) : null;

          return (
            <div className="border border-1  rounded-top-2 px-0 shadow ">
              {expense && (
                <>
                  <div className="d-flex justify-content-between rounded-top-1 pt-1 px-2 m-0 " style={{ backgroundColor: cat.color, color: "white" }}>
                    <label>Expense Category: {cat.categoryName}</label>
                    <label>
                      <FontAwesomeIcon icon={faTrashCan} color="white" className="custom-icon" onClick={() => verifyDelete(myShared.expenseId)} />
                    </label>
                  </div>
                  <div className="px-2">
                    <p>Amount: {expense.amount}</p>
                  </div>
                </>
              )}
              <div className="px-2">
                <p>
                  {myShared &&
                    myShared.userSharedWithId.map((u) => {
                      const users = u ? findUsersSharedWitdh(u) : null;

                      return (
                        users && (
                          <div className="d-flex justify-content-between">
                            <label>
                              User: {users.firstName} {users.lastName} - {users.email}
                            </label>
                            <label>cancella</label>
                          </div>
                        )
                      );
                    })}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <p>No expenses shared to view</p>
      )}
    </div>
  );
};

export default MineShared;
