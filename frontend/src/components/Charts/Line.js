import React, { useState } from 'react';
import randomColor from 'randomcolor'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, Title, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement, plugins } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)
const MyLine = ({ data }) => {
    const options = {
        plugins: {
            title: {
                display: true,
                text: "Spesa per mese durante l'anno"
            }
        }
    };
    const { totalExpenses } = data;


    const monthsLabel =
        [
            "Januray",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]

    const chartData = {
        labels: monthsLabel,
        datasets: [
            {
                label: "Total euros",
                data: [212, 112, 310],
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