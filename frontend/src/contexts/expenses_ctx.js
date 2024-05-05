import { createContext, useEffect, useState } from "react";
import AxiosClient from "../modules/AxiosClient/client"
import React from 'react';
import { jwtDecode } from "jwt-decode";


export const ExpensesCtx = createContext()

const ExpensesProvider = ({ children }) => {
    const session = JSON.parse(localStorage.getItem("authorized_user"));
    const decodedSession = jwtDecode(session);
    const [allUserExpenses, setAllUserExpenses] = useState([])
    const [totalExpenses, setTotalExpenses] = useState([])
    const [allExpensesForShared, setAllExpensesForShared] = useState([])
    const [expensesFiltered, setExpensesFiltered] = useState([])
    const client = new AxiosClient();
    const userId = decodedSession.userId;

    const getUserExpenses = async (page) => {

        try {
            const res = await client.get(`${process.env.REACT_APP_SERVER_BASE_URL}/expenses/getExpenses/${userId}?page=${page}`)
            setAllUserExpenses(res)

        } catch (e) {
            console.log(e);
        }

    }

    const getTotalExpenses = async () => {
        try {
            const res = await client.get(`${process.env.REACT_APP_SERVER_BASE_URL}/expenses/getTotalExpenses/${userId}`)
            setTotalExpenses(res)
        } catch (e) {
            console.log(e);
        }
    }

    const getAllExpensesForShared = async () => {
        try {
            const res = await client.get(`${process.env.REACT_APP_SERVER_BASE_URL}/expenses/getTotalExpenses/`)
            setAllExpensesForShared(res)
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
            const res = await client.post(`${process.env.REACT_APP_SERVER_BASE_URL}/expenses/getExpensesByDate/${userId}`, JSON.stringify(bodyToSend))
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
            getUserExpenses()

        } catch (e) {
            console.log(e);

        }
    }

    const deleteExpenseById = async (id) => {
        try {
            await client.delete(`/expenses/deleteExpense/${id}`);
            getUserExpenses()
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {

    }, [getUserExpenses])
    return (
        <ExpensesCtx.Provider value={{ allUserExpenses, totalExpenses, expensesFiltered, allExpensesForShared, getUserExpenses, addExpense, deleteExpenseById, getExpensesByDate, getTotalExpenses, getAllExpensesForShared }}>
            {children}
        </ExpensesCtx.Provider>
    )

};

export default ExpensesProvider;