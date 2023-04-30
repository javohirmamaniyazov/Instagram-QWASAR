import React from 'react';
import NavBar from './SectionNavbar';
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <NavBar/>
            <div className="content">
                <Outlet/>
            </div>
        </>
    );
};

export default Layout;