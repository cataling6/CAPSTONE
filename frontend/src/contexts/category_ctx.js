import { createContext, useState } from "react";
import AxiosClient from "../modules/AxiosClient/client";
import React from 'react';

export const CategoryCtx = createContext();


const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([])
    const client = new AxiosClient()

    const getCategories = async () => {
        try {
            const res = await client.get(`${process.env.REACT_APP_SERVER_BASE_URL}/expenses/getCategories`)
            setCategories(res)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <CategoryCtx.Provider value={{ getCategories, categories }}>
            {children}
        </CategoryCtx.Provider>
    );
};

export default CategoryProvider; 