import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, BarChart2, Flame } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo-container">
                <Flame size={32} color="#ff6b6b" />
                <span className="logo-text">Fire Weather Index</span>
            </div>

            <nav className="nav-links">
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <History size={20} />
                    <span>History</span>
                </NavLink>

                <NavLink to="/analytics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <BarChart2 size={20} />
                    <span>Analytics</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
