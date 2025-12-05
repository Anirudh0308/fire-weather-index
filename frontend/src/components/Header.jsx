import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = () => {
    return (
        <header className="header">
            <div className="header-title">
                <h1>Risk Assessment Dashboard</h1>
                <p>Real-time Forest Fire Prediction System</p>
            </div>

            <div className="header-actions">
                <div className="search-bar">
                    <Search size={18} />
                    <input type="text" placeholder="Search regions..." />
                </div>
                <button className="icon-btn">
                    <Bell size={20} />
                    <span className="notification-dot"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
