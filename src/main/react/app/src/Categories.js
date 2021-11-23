import Chart from "react-apexcharts";

export function Categories(props) {
    const options = {
                plotOptions: {
                    pie: {
                        startAngle: 0,
                        endAngle: 360,
                        expandOnClick: false,
                        offsetX: 0,
                        offsetY: 0,
                        customScale: 1,
                        dataLabels: {
                            offset: 0,
                            minAngleToShowLabel: 10
                        },
                        donut: {
                            size: '75%',
                            background: 'transparent',
                            labels: {
                                show: true,
                                name: {
                                    show: true,
                                    fontSize: '22px',
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontWeight: 600,
                                    color: undefined,
                                    offsetY: 0,
                                    formatter: function (val) {
                                    return val
                                }
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 800,
                                color: undefined,
                                offsetY: 10,
                                formatter: function (val) {
                                return val
                            }
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Razem',
                            fontSize: '24px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            color: '#373d3f',
                            formatter: (w) => {
                            return w.globals.seriesTotals.reduce((a, b) => {
                                // console.log(w.globals);
                                return a + b
                            }, 0)
                        }
                    }
                }
            },
            }
    },
        legend: {
            position: "bottom",
                fontFamily: 'Poppins, Arial',
                fontWeight: 500,
                fontSize: '14px',
                onItemClick: {
                toggleDataSeries: false
            },
            onItemHover: {
                highlightDataSeries: false
            },
            markers: {
                width: 20,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    fillColors: undefined,
                    radius: 12,
                    customHTML: function () {
                    return ''
                },
                onClick: undefined,
                    offsetX: 0,
                    offsetY: 0,

            },

        },
        dataLabels: {
            enabled: false,
        },
        labels: ['Web', 'Pwn', 'Crypto', 'Misc', 'RE'],
    }
    const series = [
        props.tasks.filter(t => t.category === 1).length,
        props.tasks.filter(t => t.category === 2).length,
        props.tasks.filter(t => t.category === 3).length,
        props.tasks.filter(t => t.category === 4).length,
        props.tasks.filter(t => t.category === 5).length,
    ]
    return <>
        <p>Kategorie</p>
        <hr/>
        <Chart options={options} series={series} type="donut" width="100%"/>
    </>;
}