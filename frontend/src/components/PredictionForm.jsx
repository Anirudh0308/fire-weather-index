import React, { useState } from 'react';
import { CloudRain, Wind, Thermometer, Droplets, Activity } from 'lucide-react';
import ResultCard from './ResultCard';
import MetricChart from './MetricChart';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    day: 15, month: 6, year: 2012,
    Temperature: 30, RH: 50, Ws: 15, Rain: 0.0,
    FFMC: 80.0, DMC: 10.0, DC: 50.0, ISI: 5.0, BUI: 10.0, FWI: 5.0
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const weatherInputs = [
    { name: 'Temperature', min: 20, max: 45, label: 'Temperature', icon: Thermometer },
    { name: 'RH', min: 20, max: 90, label: 'Humidity', icon: Droplets },
    { name: 'Ws', min: 5, max: 30, label: 'Wind Speed', icon: Wind },
    { name: 'Rain', min: 0, max: 20, label: 'Rainfall', icon: CloudRain },
  ];

  const indexInputs = [
    { name: 'FFMC', min: 20, max: 100 }, { name: 'DMC', min: 0, max: 100 },
    { name: 'DC', min: 0, max: 200 }, { name: 'ISI', min: 0, max: 30 },
    { name: 'BUI', min: 0, max: 100 }, { name: 'FWI', min: 0, max: 50 },
  ];

  return (
    <div className="dashboard-grid">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h3 className="section-title"><CloudRain size={20} /> Weather Conditions</h3>
          <div className="input-grid">
            {weatherInputs.map((input) => (
              <div key={input.name} className="control-group">
                <div className="control-label">
                  <span>{input.label}</span>
                  <span>{formData[input.name]}</span>
                </div>
                <div className="slider-container">
                  <input
                    type="range"
                    name={input.name}
                    min={input.min}
                    max={input.max}
                    step="0.1"
                    value={formData[input.name]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>

          <h3 className="section-title"><Activity size={20} /> Fire Indices</h3>
          <div className="input-grid">
            {indexInputs.map((input) => (
              <div key={input.name} className="control-group">
                <div className="control-label">
                  <span>{input.name} Index</span>
                  <span>{formData[input.name]}</span>
                </div>
                <div className="slider-container">
                  <input
                    type="range"
                    name={input.name}
                    min={input.min}
                    max={input.max}
                    step="0.1"
                    value={formData[input.name]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>

          <button type="submit" className="predict-btn" disabled={loading}>
            {loading ? 'Analyzing Data...' : 'Run Risk Analysis'}
          </button>
        </form>
      </div>

      <div className="sidebar-right">
        <ResultCard result={result} />
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3 className="section-title">Live Metrics</h3>
          <MetricChart data={formData} />
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;
