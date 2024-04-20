import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../components/Login/Login";

const isAuthorized = () => {
    const session = JSON.parse(localStorage.getItem("authorized_user"));
    return session ? session : null
}

const ProtectRoutes = () => {
    const isAuth = isAuthorized();

    return isAuth ? <Outlet /> : <Login />
}

export default ProtectRoutes