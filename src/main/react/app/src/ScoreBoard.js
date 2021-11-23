import Chart from "react-apexcharts";
import {useEffect, useState} from "react";

var _ = require('lodash');


export function ScoreBoard(props) {

    const [series, setSeries] = useState([])
    useEffect( () => {
        let mySeries = [];
        const group = _.groupBy(props.data,  'username');
        _.forEach(group, (v, k) => {
            let element = {};
            element.name = ""+k;
            element.data = [];

            _.forEach(v, (val, key) =>{
                element.data.push( [val.timestamp, val.value]);
            });
            mySeries.push(element);

        });

        setSeries(mySeries);
    }, [props.data])



    const options = {
        tooltip: {
            enabled: true,
            enabledOnSeries: undefined,
            shared: true,
            followCursor: false,
            intersect: false,
            inverseOrder: false,
            custom: undefined,
            fillSeriesColor: false,

            style: {
                fontSize: '12px',
                fontFamily: undefined
            },
            onDatasetHover: {
                highlightDataSeries: false,
            },
            x: {
                show: false,
                format: 'HH:mm',

            },
            y: {
                show: false,
                formatter: undefined,
                title: {
                    formatter: (seriesName) => seriesName,
                },
            },

            marker: {
                show: true,
            },
        },
        chart: {
            dataLabels: {
                enabled: true
            },
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            },
        },

        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },


        dataLabels: {
            enabled: true,
        },
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'HH:mm',
            }
        }
    }

    return(
     <>
         <p>Wyniki</p>
         <hr/>
         <Chart options={options} series={series} type="line" width="100%" height="300px"/>
     </>
    )

}