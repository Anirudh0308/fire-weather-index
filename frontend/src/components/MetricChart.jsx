import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const MetricChart = ({ data }) => {
    const chartData = [
        { name: 'Temp', value: data.Temperature, max: 45 },
        { name: 'Wind', value: data.Ws, max: 30 },
        { name: 'FFMC', value: data.FFMC, max: 100 },
        { name: 'DMC', value: data.DMC, max: 100 },
    ];

    return (
        <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
                <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip
                        contentStyle={{ background: '#1a1a2e', border: 'none', borderRadius: '10px' }}
                    />
                    <Bar dataKey="value" fill="#ff6b6b" radius={[5, 5, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MetricChart;
