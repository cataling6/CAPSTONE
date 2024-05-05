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

    const addCategory = async (formData) => {
        try {
            const res = await client.post(`${process.env.REACT_APP_SERVER_BASE_URL}/expenses/addCategory`, formData)
            getCategories()
        } catch (e) {
            console.log(e);
        }
    }

    const deleteCategory = async (id) => {
        try {
            await client.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/expenses/deleteCategory/${id}`)
            getCategories()
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <CategoryCtx.Provider value={{ getCategories, addCategory, categories, deleteCategory }}>
            {children}
        </CategoryCtx.Provider>
    );
};

export default CategoryProvider; 