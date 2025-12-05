import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <Header />
                <div className="content-wrapper">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
