import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart2, TrendingUp } from 'lucide-react';

const Analytics = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/analytics')
            .then(res => res.json())
            .then(setData)
            .catch(err => console.error(err));
    }, []);

    if (!data) return <div className="card">Loading analytics...</div>;

    const pieData = [
        { name: 'Fire Risk', value: data.fire_count },
        { name: 'Safe', value: data.safe_count },
    ];
    const COLORS = ['#ff6b6b', '#4ecdc4'];

    return (
        <div className="dashboard-grid">
            {/* Overview Cards */}
            <div className="card">
                <h3 className="section-title"><BarChart2 size={20} /> Risk Distribution</h3>
                <div style={{ height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={pieData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ background: '#1a1a2e', border: 'none' }} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <p>Total Predictions: <strong>{data.total_predictions}</strong></p>
                </div>
            </div>

            <div className="card">
                <h3 className="section-title"><TrendingUp size={20} /> FWI Trend (Last 7)</h3>
                <div style={{ height: 300 }}>
                    <ResponsiveContainer>
                        <LineChart data={data.trend}>
                            <XAxis dataKey="id" stroke="rgba(255,255,255,0.5)" />
                            <YAxis stroke="rgba(255,255,255,0.5)" />
                            <Tooltip contentStyle={{ background: '#1a1a2e', border: 'none' }} />
                            <Line type="monotone" dataKey="fwi" stroke="#feca57" strokeWidth={3} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <p>Average FWI: <strong>{data.avg_fwi}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
