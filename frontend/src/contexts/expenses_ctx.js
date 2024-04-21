import { createContext } from "react";
import AxiosClient from "../modules/AxiosClient"
import React from 'react';

const ExpensesProvider = ({ children }) => {
    const client = new AxiosClient();
    const session = JSON.parse(localStorage.getItem("authorized_user"))
    const headerDefault = {
        headers: {
            "Content-type": "application/json",
            "authorization": session
        }
    }

    const addExpense = async () => {

    }

};

export default ExpensesProvider;