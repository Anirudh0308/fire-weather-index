import React from 'react';

const ResultCard = ({ result }) => {
    if (!result) {
        return (
            <div className="card">
                <h3 className="section-title">Risk Analysis</h3>
                <div className="result-indicator">
                    <p style={{ color: 'var(--text-muted)' }}>Enter data to analyze risk</p>
                </div>
            </div>
        );
    }

    const isFire = result.prediction === 'Fire';
    const percentage = (result.probability * 100).toFixed(1);

    return (
        <div className="card">
            <h3 className="section-title">Risk Analysis</h3>
            <div className="result-indicator">
                <div className={`risk-circle ${isFire ? 'fire' : 'safe'}`}>
                    {percentage}%
                </div>
                <p className="prob-text">
                    {isFire ? 'High Fire Risk Detected' : 'Low Fire Risk Detected'}
                </p>
            </div>
        </div>
    );
};

export default ResultCard;
