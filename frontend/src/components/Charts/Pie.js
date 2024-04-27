import React from 'react';
import randomColor from 'randomcolor'
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Tooltip, Legend, ArcElement)
const MyPie = ({ data }) => {
    // Raggruppa i dati per categoria e calcola la somma degli importi

    // const categoriesId = ["a", "b"]
    // const amounts = [1, 2, 3, 4]
    //const amounts = data.map(({ amount }) => amount);
    //raggruppo i dati per categoria e calcolo la somma degli importi
    const aggregatedData = data.reduce((acc, curr) => {
        const existingCategory = acc.find(item => item.category === curr.category);
        if (existingCategory) {
            existingCategory.amount += curr.amount;
        } else {
            acc.push({ category: curr.category, amount: curr.amount });
        }
        return acc;
    }, []);

    const categoriesId = aggregatedData.map(({ category }) => category);
    const backgroundColors = categoriesId.map(() => randomColor());
    const amounts = aggregatedData.map(({ amount }) => amount);

    const options = {}
    const lineChartdata = {
        labels: categoriesId,
        datasets: [
            {
                label: "Total euros",
                data: amounts,
                backgroundColor: backgroundColors,
                hoverOffset: 4,
            }
        ]
    }

    return (
        <div style={{ width: "600px", height: "600px" }}>

            <Pie options={options} data={lineChartdata} />
        </div >
    );



};

export default MyPie;