import React from 'react';
import { Outlet,NavLink } from 'react-router-dom';
import { useAuth,AuthContext } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { CheckToken,timeout } from '../common/api';

const PrivateRoute =  () => {

    let navigate=useNavigate();
    let token=localStorage.getItem('token');
    
    if (!token){
        return (<Navigate to="/login" replace ={true}/>)
        // navigate('/login', { replace: true });
    }else{

        //refresh token
        CheckToken().then(res => {
            const { message } = res.content;
            if (message != 'OK!') {
                localStorage.removeItem('token');
                navigate('/login', { replace: true });
            }
        })

    }

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

export default PrivateRoute;