import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../components/Login/Login";
import ExpensesProvider from "../contexts/expenses_ctx";
import CategoryProvider from "../contexts/category_ctx";
import SharedExpensesProvider from "../contexts/sharedExpenses_ctx";

const isAuthorized = () => {
    const session = JSON.parse(localStorage.getItem("authorized_user"));
    return session ? session : null
}

const ProtectRoutes = () => {
    const isAuth = isAuthorized();

    return isAuth ?
        <ExpensesProvider>
            <CategoryProvider>
                <SharedExpensesProvider>
                    <Outlet />
                </SharedExpensesProvider>
            </CategoryProvider>
        </ExpensesProvider>
        : <Login />
}

export default ProtectRoutes