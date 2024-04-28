import React, { useState } from 'react';
import randomColor from 'randomcolor'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, Title, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)
const MyLine = ({ data }) => {
    const options = {};
    // const expenses = data.map(({ exp }))
    //const backgroundColors = categoriesId.map(() => randomColor());
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
                data: [1, 2, 3],
                borderColor: "rgb(75,192,192)"
            }
        ]
    }
    return (
        <div style={{ width: "500px", height: "400px" }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default MyLine;