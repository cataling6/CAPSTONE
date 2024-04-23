import { createContext, useEffect, useState } from "react";
import AxiosClient from "../modules/AxiosClient/client"
import React from 'react';
import { json } from "react-router-dom";


export const ExpensesCtx = createContext()

const ExpensesProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([])
    const client = new AxiosClient();


    const getExpenses = async (page) => {

        try {
            const res = await client.get(`${process.env.REACT_APP_SERVER_BASE_URL}/expenses/getExpenses?page=${page}`)
            setExpenses(res)

        } catch (e) {
            console.log(e);
        }

    }

    const addExpense = async (formdata) => {
        try {
            formdata.amount = parseFloat(formdata.amount);
            const res = await client.post(`${process.env.REACT_APP_SERVER_BASE_URL}/expenses/addExpense`, formdata)
            getExpenses()

        } catch (e) {


        }
    }

    const deleteExpenseById = async (id) => {
        try {
            await client.delete(`/expenses/deleteExpense/${id}`);
            getExpenses()
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {

    }, [getExpenses])
    return (
        <ExpensesCtx.Provider value={{ expenses, getExpenses, addExpense, deleteExpenseById }}>
            {children}
        </ExpensesCtx.Provider>
    )

};

export default ExpensesProvider;