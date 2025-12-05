import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/history')
            .then(res => res.json())
            .then(data => setHistory(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="dashboard-grid" style={{ display: 'block' }}>
            <div className="card">
                <h3 className="section-title"><Clock size={20} /> Prediction History</h3>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Time</th>
                                <th style={{ padding: '1rem' }}>Temp</th>
                                <th style={{ padding: '1rem' }}>FWI</th>
                                <th style={{ padding: '1rem' }}>Result</th>
                                <th style={{ padding: '1rem' }}>Risk</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((record) => (
                                <tr key={record.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem' }}>{new Date(record.timestamp).toLocaleString()}</td>
                                    <td style={{ padding: '1rem' }}>{record.Temperature}°C</td>
                                    <td style={{ padding: '1rem' }}>{record.FWI}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            color: record.prediction === 'Fire' ? '#ff6b6b' : '#4ecdc4',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}>
                                            {record.prediction === 'Fire' ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
                                            {record.prediction}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>{(record.probability * 100).toFixed(1)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default History;
