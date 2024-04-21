import { createContext, useState } from "react";
import AxiosClient from "../modules/AxiosClient/client"
import React from 'react';


export const ExpensesCtx = createContext()

const ExpensesProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([])
    const client = new AxiosClient();


    const getExpenses = async () => {
        try {
            const res = await client.get(`${process.env.REACT_APP_SERVER_BASE_URL}/expenses/getExpenses`)
            setExpenses(res)
        } catch (e) {
            console.log(e);
        }

    }

    const addExpense = async (formdata) => {
        try {

            const res = await client.post(`${process.env.REACT_APP_SERVER_BASE_URL}/expenses/addExpense`, {
                body: formdata
            })
            console.log(res);
            return await res.json()
        } catch (e) {
            console.log(e);

        }
    }
    return (
        <ExpensesCtx.Provider value={{ expenses, getExpenses, addExpense }}>
            {children}
        </ExpensesCtx.Provider>
    )

};

export default ExpensesProvider;