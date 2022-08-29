import React from 'react';
import { Outlet,NavLink } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            {/* test */}
            {/* <ul>
                <li><NavLink to="/login">Login</NavLink></li>
                <br/>              
                <li><NavLink to="/signup">Signup</NavLink></li>
                <br />
                <li><NavLink to="/signup">Main</NavLink></li>
            </ul> */}
            <Outlet />
        </div>
    );
};

export default Layout;