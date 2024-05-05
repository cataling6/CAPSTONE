import { createContext, useEffect, useState } from "react";
import AxiosClient from "../modules/AxiosClient/client"
import React from 'react';
import { jwtDecode } from "jwt-decode";

export const SharedExpensesCtx = createContext()

const SharedExpensesProvider = ({ children }) => {
    const [sharedExpenses, setMySharedExpenses] = useState([])
    const [sharedWithMeExpenses, setSharedWithMeExpenses] = useState([])
    const client = new AxiosClient()
    const session = JSON.parse(localStorage.getItem("authorized_user"))
    const decodedSession = jwtDecode(session)
    const userId = decodedSession.userId

    const getMySharedExpenses = async () => {
        try {
            const res = await client.get(`${process.env.REACT_APP_SERVER_BASE_URL}/sharedExpense/getMySharedExpenses/${userId}`)
            setMySharedExpenses(res);
        } catch (e) {
            console.log(e);
        }
    }

    const getSharedExpensesWithMe = async () => {
        try {
            const sharedToMe = await client.get(`${process.env.REACT_APP_SERVER_BASE_URL}/sharedExpense/getSharedExpensesWithMe/${userId}`)
            setSharedWithMeExpenses(sharedToMe)

        } catch (e) {
            console.log(e);
        }
    }

    const shareExpenseWith = async (formdata) => {
        try {
            const res = await client.post(`${process.env.REACT_APP_SERVER_BASE_URL}/sharedExpense/addSharedExpense`, formdata)
            getMySharedExpenses()
            return res;
        } catch (e) {
            console.log();
        }
    }

    const delSharedExpense = async (id) => {
        try {
            const res = await client.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/sharedExpense/delSharedExpense/${id}`)
            getMySharedExpenses();
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {

    }, [getMySharedExpenses])
    return (
        <SharedExpensesCtx.Provider value={{ sharedExpenses, sharedWithMeExpenses, getMySharedExpenses, shareExpenseWith, getSharedExpensesWithMe, delSharedExpense }}>
            {children}
        </SharedExpensesCtx.Provider>
    )
};

export default SharedExpensesProvider;