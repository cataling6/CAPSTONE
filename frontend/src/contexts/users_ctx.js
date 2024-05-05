import { createContext, useState } from "react";
import AxiosClient from "../modules/AxiosClient/client";
import React from 'react';

export const UsersCtx = createContext();

const UsersProvider = ({ children }) => {

    const [users, setUsers] = useState([])
    const client = new AxiosClient()

    const getUsers = async () => {
        try {
            const res = await client.get(`${process.env.REACT_APP_SERVER_BASE_URL}/getUsers`)
            setUsers(res)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <UsersCtx.Provider value={{ users, getUsers }}>
            {children}
        </UsersCtx.Provider>
    )
}
export default UsersProvider