import React, { useContext, useEffect, useState } from 'react';
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, Title, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement, plugins } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)
const MyLine = ({ data, trigger }) => {

    const [monthlyExpenses, setMonthlyExpenses] = useState({});



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


            });

            setMonthlyExpenses(monthlyTotal);


        };
    }


    const options = {
        plugins: {
            title: {
                display: true,
                text: "Monthly expense this year:"
            }
        }
    };


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
    useEffect(() => {
        calculateMonthlyExpenses();
    }, [trigger])

    return (
        <div className="d-flex align-content-center flex-wrap " style={{ width: "400px", height: "400px" }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default MyLine;