import React, { useEffect, useState } from 'react';
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, layouts } from 'chart.js'
import "./style.css"
ChartJS.register(Title, Tooltip, Legend, ArcElement)
const MyPie = ({ data, categoryData, deltaDay }) => {


    let chartTitleText = ""

    if (!data || data.length === 0 || !data[0]?.category) {
        return <div className='mt-2'>Dati non disponibili</div>;
    }

    //mi raggruppo le categorie ed evito che i doppioni vengano viusualizzati; laddove categoia è la stessa, sommo l'ammount 
    const aggregatedData = data.reduce((acc, curr) => {
        const existingCategory = acc.find(item => item.category === curr.category);
        if (existingCategory) {
            existingCategory.amount += curr.amount;
        } else {
            acc.push({ category: curr.category, amount: curr.amount });
        }
        return acc;
    }, []);

    switch (deltaDay) {
        case 0:
            chartTitleText = "Spese giornaliere"
            break;
        case 7:
            chartTitleText = "Spese settimanali"
            break;
        case 30:
            chartTitleText = "Spese mensili"
            break;

        default:
            break;
    }

    const categoriesId = aggregatedData.map(({ category }) => category);

    //mi genero bg casuali con randomcolor.js
    const backgroundColors = categoriesId.map(({ color }) => color);
    const amounts = aggregatedData.map(({ amount }) => amount);

    //mi prendo i dati categorie tramite id 
    const categoriesData = categoriesId.map(categoryId => {
        return categoryData(categoryId)
    });

    //mi prendo i nomi
    const categoryNames = categoriesData.map(item => item[0])
    //mi prendo i colori
    const categoryColors = categoriesData.map(item => item[1])

    const options = {
        plugins: {
            layout: {
                padding: {
                    right: "200"
                }
            },
            legend: {
                display: true,
                position: "bottom",

            },
            tooltip: {
                enabled: true // Disabilito il tooltip per evitare sovrapposizioni con le labels
            },
            title: {
                display: true,
                text: chartTitleText
            },

        },

    }

    const chartData = {
        labels: categoryNames,
        datasets: [
            {
                label: "Total euros",
                data: amounts,
                backgroundColor: categoryColors,
                hoverOffset: 20,
            }
        ]
    }


    return (
        <div className="chart-container" >
            <Pie options={options} data={chartData} />
        </div >
    );



};

export default MyPie;