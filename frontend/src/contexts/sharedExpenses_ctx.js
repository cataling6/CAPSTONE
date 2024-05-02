import { createContext, useEffect, useState } from "react";
import AxiosClient from "../modules/AxiosClient/client"
import React from 'react';

export const SharedExpensesCtx = createContext()

const SharedExpensesProvider = ({ children }) => {
    const [sharedExpenses, setMySharedExpenses] = useState([])
    const client = new AxiosClient()

    const getSharedExpenses = async () => {
        try {
            const res = await client.get(`${process.env.REACT_APP_SERVER_BASE_URL}/sharedExpense/getSharedExpenses`)
            setMySharedExpenses(res);
        } catch (e) {
            console.log(e);
        }
    }

    const shareExpenseWith = async (formdata) => {
        try {
            const res = await client.post(`${process.env.REACT_APP_SERVER_BASE_URL}/sharedExpense/addSharedExpense`, formdata)
            getSharedExpenses()
        } catch (e) {
            console.log();
        }
    }
    useEffect(() => {

    }, [getSharedExpenses])
    return (
        <SharedExpensesCtx.Provider value={{ sharedExpenses, getSharedExpenses, shareExpenseWith }}>
            {children}
        </SharedExpensesCtx.Provider>
    )
};

export default SharedExpensesProvider;