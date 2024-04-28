import React, { useState } from 'react';
import randomColor from 'randomcolor'
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)
const MyPie = ({ data, categoryNames }) => {

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

    const categoriesId = aggregatedData.map(({ category }) => category);
    //mi genero bg casuali con randomcolor.js
    const backgroundColors = categoriesId.map(() => randomColor());
    const amounts = aggregatedData.map(({ amount }) => amount);

    //mi prendo i nomi delle categorie tramite id 
    const categoriesNames = categoriesId.map(categoryId => {
        return categoryNames(categoryId)
    });

    const options = {
        plugins: {
            legend: {
                display: true, // Nascondo la legenda per evitare sovrapposizioni con le labels
                position: "left",

            },
            tooltip: {
                enabled: true // Disabilito il tooltip per evitare sovrapposizioni con le labels
            },
            title: {
                display: true,
                text: "Il mio titolo del grafico"
            }

        },
        layout: {
            margin: {
                // Imposto il padding per lasciare spazio alle labels al centro del grafico
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },

    }

    const chartData = {
        labels: categoriesNames,
        datasets: [
            {
                label: "Total euros",
                data: amounts,
                backgroundColor: backgroundColors,
                hoverOffset: 4,
            }
        ]
    }
    if (!data) {
        return <div>Dati non disponibili</div>;
    } else {
        return (
            <div style={{ width: "500px", height: "400px" }}>
                <Pie options={options} data={chartData} />
            </div >
        );
    }


};

export default MyPie;