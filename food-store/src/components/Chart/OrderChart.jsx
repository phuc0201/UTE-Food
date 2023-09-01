import React from "react";
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const OrderChart = ({ dailyOrderCount })=>{
    
    if(!dailyOrderCount){
        return <div>Loading</div>
    }
    const data = {
        labels: Array.from(dailyOrderCount).map(item => item.orderDate),
        datasets: [
            {
                label: 'Tổng số lượng đơn hàng',
                data: Array.from(dailyOrderCount).map(item => item.totalOrders),
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Màu nền
                borderColor: 'rgba(75, 192, 192, 1)', 
                borderWidth: 1,
            },
        ],
    };
    
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        elements: {
            line: {
              cubicInterpolationMode: 'monotone', // Đường cong cubic spline
            },
        },
    };
    
    
    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
}
export default OrderChart;