import React, { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, Title, CategoryScale, LinearScale, BarElement, Tooltip, Legend, plugins } from 'chart.js'
import "./style.css"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const MyBar = ({ data, trigger }) => {

    const [monthlyExpenses, setMonthlyExpenses] = useState({});
    const [monthlyCategoryExpenses, setMonthlyCategoryExpenses] = useState({});

    const calculateMonthlyExpenses = async () => {
        const monthlyTotal = {};
        const monthlyCategoryTotal = {};
        if (data) {
            data.forEach(expense => {
                const date = new Date(expense.opDate);
                const month = date.getMonth();
                const year = date.getFullYear();
                const key = `${year}-${month + 1}`;

                // totalExpenses expenses per month
                if (!monthlyTotal[key]) {
                    monthlyTotal[key] = 0;
                }
                monthlyTotal[key] += expense.amount;

                // Total expenses per category per month
                if (!monthlyCategoryTotal[key]) {
                    monthlyCategoryTotal[key] = {};
                }
                if (!monthlyCategoryTotal[key][expense.category]) {
                    monthlyCategoryTotal[key][expense.category] = 0;
                }
                monthlyCategoryTotal[key][expense.category] += expense.amount;
            });

            setMonthlyExpenses(monthlyTotal);
            setMonthlyCategoryExpenses(monthlyCategoryTotal);

        };
    }

    const monthlyExpensesArray = Object.entries(monthlyCategoryExpenses).map(([key, value]) => {
        const [maxKey, maxValue] = Object.entries(value).reduce(([maxKey, max], [k, v]) => v > max ? [k, v] : [maxKey, max], ["", 0]);
        return {
            label: key,
            category: maxKey,
            data: maxValue
        };
    });

    const labels = monthlyExpensesArray.map(item => item.label)
    const myData = monthlyExpensesArray.map(item => item.data)
    const cat = monthlyExpensesArray.map(item => item.category)


    console.log(cat);
    console.log(myData);
    console.log(labels);
    const options = {
        plugins: {
            title: {
                display: true,
                text: "Categoria più costosa per ogni mese"
            },
            legend: {
                display: true,
                position: "bottom",

            },
        }
    };



    const chartData = {
        labels: labels,
        datasets: [
            {
                label: cat,
                data: myData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',]
            }
        ]
    }
    useEffect(() => {
        calculateMonthlyExpenses();
    }, [trigger])

    return (
        <div className='chart-bar'>
            <Bar data={chartData} options={options} />
        </div>
    );

}
export default MyBar;