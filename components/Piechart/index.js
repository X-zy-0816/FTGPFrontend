import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const EChartsPie = ({ data }) => {

    useEffect(() => {
        const chartDom = document.getElementById('chart');

        const myChart = echarts.init(chartDom);

        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {d}%',
            },
            series: [
                {
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '50%'],
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                    label: {
                        show: true,
                        formatter: '{b} {d}%',
                    },
                    labelLine: {
                        show: true,
                    },
                },
            ],
        };
        myChart.setOption(option);


        return () => {
            myChart.dispose();
        };
    }, [data]);

    return (
        <div id="chart" style={{ height: '400px', margin: '0 auto', width: '80%' }}>
            <h2 style={{ textAlign: 'center', margin: '1rem 0' }}>My Pie Chart</h2>
        </div>
    );
};

export default EChartsPie;
