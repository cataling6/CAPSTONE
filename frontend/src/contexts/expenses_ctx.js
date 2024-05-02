import { createContext, useEffect, useState } from "react";
import AxiosClient from "../modules/AxiosClient/client"
import React from 'react';
import { jwtDecode } from "jwt-decode";


export const ExpensesCtx = createContext()

const ExpensesProvider = ({ children }) => {
    const session = JSON.parse(localStorage.getItem("authorized_user"));
    const decodedSession = jwtDecode(session);
    const [expenses, setExpenses] = useState([])
    const [totalExpenses, setTotalExpenses] = useState([])
    const [expensesFiltered, setExpensesFiltered] = useState([])
    const client = new AxiosClient();
    const userId = decodedSession.userId;

    const getExpenses = async (page) => {

        try {
            const res = await client.get(`${process.env.REACT_APP_SERVER_BASE_URL}/expenses/getExpenses/${userId}?page=${page}`)
            setExpenses(res)

        } catch (e) {
            console.log(e);
        }

    }

    const getTotalExpenses = async () => {
        try {
            const res = await client.get(`${process.env.REACT_APP_SERVER_BASE_URL}/expenses/getTotalExpenses`)
            setTotalExpenses(res)
        } catch (e) {
            console.log(e);
        }
    }
    const getExpensesByDate = async (startDate, endDate) => {
        const bodyToSend = {
            "fromDate": startDate,
            "toDate": endDate
        }

        try {
            const res = await client.post(`${process.env.REACT_APP_SERVER_BASE_URL}/expenses/getExpensesByDate`, JSON.stringify(bodyToSend))
            setExpensesFiltered(res.data)
            return res.expensesByDate;
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
            console.log(e);

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
        <ExpensesCtx.Provider value={{ expenses, totalExpenses, expensesFiltered, getExpenses, addExpense, deleteExpenseById, getExpensesByDate, getTotalExpenses }}>
            {children}
        </ExpensesCtx.Provider>
    )

};

export default ExpensesProvider;