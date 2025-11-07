import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({children}) => {
    const {user , loading}= use(AuthContext);
    const location = useLocation();
    console.log(location);

    if(loading){
        return <p>Loading.....</p>
    }

    if(user){
        return children;
    }
    return <Navigate state={location?.pathname} to={'/login'}></Navigate>;
};

export default PrivateRoute;