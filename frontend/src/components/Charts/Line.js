import React, { useContext, useEffect, useState } from 'react';
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, Title, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement, plugins } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)
const MyLine = ({ data, trigger }) => {

    const [monthlyExpenses, setMonthlyExpenses] = useState({});
    const [monthlyCategoryExpenses, setMonthlyCategoryExpenses] = useState({});


    const calculateMonthlyExpenses = () => {
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

    // console.log(monthlyExpenses);
    // console.log(monthlyCategoryExpenses);
    const options = {
        plugins: {
            title: {
                display: true,
                text: "Spesa per mese durante l'anno"
            }
        }
    };

    useEffect(() => {
        calculateMonthlyExpenses();
    }, [trigger])

    const monthlyExpensesArray = Object.entries(monthlyExpenses).map(([key, value]) => ({
        label: key,
        data: value
    }));

    const chartData = {
        labels: monthlyExpensesArray.map(item => item.label),
        datasets: [
            {
                label: "Total euros",
                data: monthlyExpensesArray.map(item => item.data),
                borderColor: "rgb(75,192,192)"
            }
        ]
    }
    return (
        <div className="d-flex align-content-center flex-wrap " style={{ width: "500px", height: "400px" }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default MyLine;